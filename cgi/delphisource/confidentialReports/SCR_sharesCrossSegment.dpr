program SCR_sharesCrossSegment;

uses
  SysUtils,Windows,Classes, superobject, HCD_SystemDefinitions, System.TypInfo, inifiles,
  CgiCommonFunction;

const
      vsd_AbsoluteValue    = 100;
      vsd_ValueChange      = 101;
      vsd_AbsoluteVolume   = 102;
      vsd_VolumeChange     = 103;

var
  DataDirectory : string;
  sListData: tStrings;
  sValue : string;
  currentResult : TAllResults;
  currentPeriod : TPeriodNumber;
  currentProducer : TAllProducers;
  currentSeminar : string;
  vReadRes : Integer;
  oJsonFile : ISuperObject;

  function ShopperInfoSchema(fieldIdx: Integer; segmentID : Integer; shopper : TShoppersKind; variant : TVariantCrossSegmentDetails):ISuperObject;
  var
    jo : ISuperObject;
    ShopperStr : string;
  //  segmentID : integer;
  begin
    jo := SO;
    case Shopper of
        BMS         : ShopperStr := 'BMS'; 
        NETIZENS    : ShopperStr := 'NETIZENS';   
        MIXED       : ShopperStr := 'MIXED';  
        ALLSHOPPERS : ShopperStr := 'ALLSHOPPERS'; 
    else
        ShopperStr  := 'wrong';
    end;

    jo.S['shopperKind'] := ShopperStr;
    case (fieldIdx) of
      vsd_AbsoluteValue     : begin jo.D['value'] := variant.vsd_AbsoluteValue[segmentID, shopper]; end;
      vsd_ValueChange       : begin jo.D['value'] := variant.vsd_ValueChange[segmentID, shopper]; end;
      vsd_AbsoluteVolume    : begin jo.D['value'] := variant.vsd_AbsoluteVolume[segmentID, shopper]; end;
      vsd_VolumeChange      : begin jo.D['value'] := variant.vsd_VolumeChange[segmentID, shopper]; end;
    end;

    result := jo;
  end;

  function segmentInfoSchema(fieldIdx: Integer; segmentID : Integer; variant : TVariantCrossSegmentDetails):ISuperObject;
  var
    jo : ISuperObject;
    Shopper : TShoppersKind;
  begin
    jo := SO;
    jo.I['segmentID'] := segmentID;
    jo.O['shopperInfo'] := SA([]);
    for Shopper := Low(TShoppersKind) to High(TShoppersKind) do
      jo.A['shopperInfo'].Add( ShopperInfoSchema(fieldIdx, segmentID, Shopper, variant) );

    result := jo;
  end;

  function variantInfoSchema(fieldIdx : Integer; catID : Integer; marketID : Integer; variant : TVariantCrossSegmentDetails):ISuperObject;
  var 
    jo : ISuperObject;
    segmentID : integer;
  begin
    jo := SO;
    jo.S['variantName'] := variant.vsd_VariantName;
    jo.S['parentBrandName'] := variant.vsd_ParentBrandName;
    jo.I['parentCategoryID'] := catID;
    jo.I['marketID'] := marketID;
    
    jo.O['segmentInfo'] := SA([]);
    for segmentID := Low(TSegmentsTotal) to High(TSegmentsTotal) do 
    begin
      jo.A['segmentInfo'].Add( segmentInfoSchema(fieldIdx, segmentID, variant) );
    end;

    result := jo;
  end;

  procedure makeJson();
  var
    s_str : string;
    catID,brandCount,variantCount,marketID : Integer;
    tempVariant : TVariantCrossSegmentDetails;
  begin
    oJsonFile := SO;
    oJsonFile.S['seminar'] := currentSeminar;
    oJsonFile.I['period'] := currentPeriod;
    oJsonFile.I['producerID'] := currentProducer;

    oJsonFile.O['absoluteValue'] := SA([]);
    oJsonFile.O['valueChange'] := SA([]);
    oJsonFile.O['absoluteVolume'] := SA([]);
    oJsonFile.O['volumeChange'] := SA([]);

    for catID :=  Low(TCategories) to High(TCategories) do 
    begin
      for brandCount := Low(TProBrands) to High(TProBrands) do 
      begin
        for variantCount := Low(TOneBrandVariants) to High(TOneBrandVariants) do
        begin
          for marketID := Low(TMarkets) to High(TMarkets) do
          begin
            tempVariant := currentResult.r_SuppliersConfidentialReports[currentProducer].scr_SharesByCrossSegment[catID, marketID, brandCount, variantCount];
            if (tempVariant.vsd_Shown = true)
            AND (tempVariant.vsd_VariantName <> '')
            AND (tempVariant.vsd_ParentBrandName <> '') then
            begin
                oJsonFile.A['absoluteValue'].Add( variantInfoSchema(vsd_absoluteValue, catID, marketID, tempVariant) );
                oJsonFile.A['absoluteVolume'].Add( variantInfoSchema(vsd_absoluteVolume, catID, marketID, tempVariant ));
                oJsonFile.A['valueChange'].Add( variantInfoSchema(vsd_valueChange, catID, marketID, tempVariant ));
                oJsonFile.A['volumeChange'].Add( variantInfoSchema(vsd_volumeChange, catID, marketID, tempVariant ));
            end;
          end;
        end;      
      end;          
    end;

    //for debug used
    s_str := 'out' + '.json';
    writeln( oJsonFile.AsJSon(False,False));
    oJsonFile.SaveTo(s_str, true, false);
  end;

begin
    SetMultiByteConversionCodePage(CP_UTF8);
    sListData := TStringList.Create;
    sListData.Clear;

    try
      WriteLn('Content-type: application/json');
      sValue := getVariable('REQUEST_METHOD');
      if sValue='GET' then
      begin
          sValue := getVariable('QUERY_STRING');
          Explode(sValue, sListData);
          LoadConfigIni(DataDirectory, getSeminar(sListData));
          //initialise GET request parameters
          currentSeminar := getSeminar(sListData);
          currentPeriod := getPeriod(sListData);
          currentProducer := getProducerID(sListData);
          {** Read results file **}
          vReadRes := ReadResults(currentPeriod, currentSeminar, DataDirectory,currentResult); // read Results file

          // Read result failed
          if vReadRes <> 0 then
          begin
            Writeln('Status: 404 Not Found');
            WriteLn;
          end
          else
          //Read result successfully, generate JSON and writeln
          begin
            WriteLn;
            makeJson;            
          end;
      end;
    finally
      sListData.Free;
    end;
end.2