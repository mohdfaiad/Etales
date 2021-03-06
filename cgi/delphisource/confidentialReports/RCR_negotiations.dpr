﻿program RCR_negotiations;


uses
  SysUtils,Windows,Classes, superobject, HCD_SystemDefinitions, System.TypInfo, inifiles,
  CgiCommonFunction;

const
  discount_MinimumVolume = 100;
  discount_Rate = 101;
  bonus_TargetVolume = 102;
  bonus_Rate = 103;
  bonus_Value = 104;
  vnd_PaymentTerms = 105;
  vnd_OtherCompensation = 106;
  vnd_ContractHonoured = 107;

var
  DataDirectory : string;
  sListData: tStrings;
  sValue : string;

  currentResult : TAllResults;
  currentPeriod : TPeriodNumber;
  currentRetailer : TBMRetailers;  
  currentSeminar : string;
  vReadRes : Integer;
  oJsonFile : ISuperObject;

  function variantInfoSchema(fieldIdx : Integer; catID : Integer; producerID : integer; variant : TVariantNegotiationsDetails):ISuperObject;
  var 
    jo : ISuperObject;
  begin
    jo := SO;
    jo.S['variantName'] := variant.vnd_VariantName;
    jo.S['parentBrandName'] := variant.vnd_ParentBrandName;
    jo.I['parentCategoryID'] := catID;
    jo.I['producerID'] := producerID;

    case (fieldIdx) of
      discount_MinimumVolume: begin jo.D['value'] := variant.vnd_QuantityDiscount.discount_MinimumVolume; end;
      discount_Rate: begin jo.D['value'] := variant.vnd_QuantityDiscount.discount_Rate; end;
      bonus_TargetVolume: begin jo.D['value'] := variant.vnd_TargetBonus.bonus_TargetVolume; end;
      bonus_Rate: begin jo.D['value'] := variant.vnd_TargetBonus.bonus_Rate; end;
      bonus_Value: begin jo.D['value'] := variant.vnd_TargetBonus.bonus_Value; end;
      vnd_PaymentTerms: begin jo.D['value'] := variant.vnd_PaymentTerms; end;
      vnd_OtherCompensation: begin jo.D['value'] := variant.vnd_OtherCompensation; end;
      vnd_ContractHonoured: begin jo.B['value'] := variant.vnd_ContractHonoured; end;
    end;
    
    result := jo;
  end;

  procedure makeJson();
  var
    s_str : string;
    actorID,catID,brandID,variantID,marketID,producerID : Integer;
    joBonusDetails, joDiscountDetails : ISuperObject;
    tempVariant : TVariantNegotiationsDetails;
  begin
    oJsonFile := SO;
    oJsonFile.S['seminar'] := currentSeminar;
    oJsonFile.I['period'] := currentPeriod;
    oJsonFile.I['retailerID'] := currentRetailer;

    joBonusDetails := SO;
    joBonusDetails.O['bonus_TargetVolume'] := SA([]);
    joBonusDetails.O['bonus_Rate'] := SA([]);
    joBonusDetails.O['bonus_Value'] := SA([]);
    joDiscountDetails := SO;
    joDiscountDetails.O['discount_MinimumVolume'] := SA([]);
    joDiscountDetails.O['discount_Rate'] := SA([]);    
    oJsonFile.O['vnd_PaymentTerms'] := SA([]);
    oJsonFile.O['vnd_OtherCompensation'] := SA([]);
    oJsonFile.O['vnd_ContractHonoured'] := SA([]);

    for catID :=  Low(TCategories) to High(TCategories) do 
    begin
      for brandID := Low(TProBrands) to High(TProBrands) do 
      begin
        for variantID := Low(TOneBrandVariants) to High(TOneBrandVariants) do
        begin
          for producerID := Low(TAllProducers) to High(TAllProducers) do
          begin
            tempVariant := currentResult.r_RetailersConfidentialReports[currentretailer].rcr_Negotiations[catID, producerID , brandID, variantID];
            if(tempVariant.vnd_VariantName <> '') AND (tempVariant.vnd_ParentBrandName <> '') then
            begin

              joBonusDetails.A['bonus_TargetVolume'].Add( variantInfoSchema(bonus_TargetVolume, catID, producerID, tempVariant) );
              joBonusDetails.A['bonus_Rate'].Add( variantInfoSchema(bonus_Rate, catID, producerID, tempVariant) );
              joBonusDetails.A['bonus_Value'].Add( variantInfoSchema(bonus_Value, catID, producerID, tempVariant) );

              joDiscountDetails.A['discount_MinimumVolume'].Add(variantInfoSchema(discount_MinimumVolume, catID, producerID, tempVariant) );
              joDiscountDetails.A['discount_Rate'].Add(variantInfoSchema(discount_Rate, catID, producerID, tempVariant) );

              oJsonFile.A['vnd_PaymentTerms'].Add(variantInfoSchema(vnd_PaymentTerms, catID, producerID, tempVariant) );
              oJsonFile.A['vnd_OtherCompensation'].Add(variantInfoSchema(vnd_OtherCompensation, catID, producerID, tempVariant) );
              oJsonFile.A['vnd_ContractHonoured'].Add(variantInfoSchema(vnd_ContractHonoured, catID, producerID, tempVariant) );
            end;            
          end;
        end;      
      end;          
    end;

    oJsonFile.O['vnd_TargetBonus'] := joBonusDetails;
    oJsonFile.O['vnd_QuantityDiscount'] := joDiscountDetails;

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
          currentRetailer := getRetailerID(sListData);
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
end.

