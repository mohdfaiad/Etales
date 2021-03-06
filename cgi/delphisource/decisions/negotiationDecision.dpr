﻿program negotiationDecision;

//Original :: DelphiCGI Developed by Andrea Russo - Italy
//email: andrusso@yahoo.com

{$IFNDEF LINUX}
  {$IFDEF FPC}
    {$IFDEF UNIX}
      {$DEFINE LINUX}
    {$ENDIF}
  {$ENDIF}
{$ENDIF}

{$IFDEF FPC}
 {$mode objfpc}{$H+}
{$ELSE}
 {$APPTYPE CONSOLE}
{$ENDIF}

uses
  SysUtils,

  {$IFDEF LINUX}
    {$IFDEF FPC}
      dos,
    {$ELSE}
      Libc,
    {$ENDIF}
  {$ELSE}
    Windows,
  {$ENDIF}
  Classes, superobject, CgiCommonFunction, HCD_SystemDefinitions, System.TypInfo,inifiles;

const
  DecisionFileName = 'Negotiations.';
  dummyNo = 1;

  dummySeminar = 'ROUND1';
  aCategories : array[TCategories] of string = ('Elecsories', 'HealthBeauties');
  aMarkets : array[TMarketsTotal] of string = ('Urban', 'Rural', 'Total');

var
 DataDirectory : string;
   i: integer;
   sDati : string;
   sListData: tStrings;
   bUpload: boolean;
   sValue : string;
   iSize : integer;

   sResponseData : tStrings;
   sLogList : TStrings;

   currentAllDeals  : TAllDeals;
   currentPeriod : TPeriodNumber;
   currentSeminar : string;
   vReadRes : Integer;

   oJsonFile : ISuperObject;
   sFile  : string;

   procedure Log(content: String);
   begin
      sLoglist.Add(FormatDateTime('[yyyy-MM-dd hh:mm:ss] ',Now) + content);
   end;

  function ReadNegoRecordByProDecision(pPeriodNumber : TPeriodNumber;
    var pDecision: TAllDeals; vDataDirectory : AnsiString; vSeminarCode : AnsiString) : Integer;
  var
    vFile    : file of TAllDeals;
    vFileName   : String;
    vTempResult : integer;
  begin
    vFileName := vDataDirectory + NegotiationsFileName + vSeminarCode;
    if FileExists(vFileName) = false then
    begin
        Writeln('negotiation file does not exist:' + vFileName);
        Result := -1;
        exit;
    end;

    try
        try
          AssignFile( vFile, vFileName );
          Reset( vFile );
          if ( pPeriodNumber < HistoryEnd ) then pPeriodNumber := HistoryEnd;
          Seek( vFile, pPeriodNumber - HistoryStart );
          Read( vFile, pDecision);
          vTempResult := 0;
        except
          on E: EInOutError do
          begin
            Writeln('Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + vFileName + #13 + #10 + E.Message );
            vTempResult := E.ErrorCode;
          end;
        end;
    finally
       CloseFile( vFile );
    end;
    Result := vTempResult;
  end;

    function WriteNegoDecisionRecord(pPeriodNumber: TPeriodNumber; var pDecision : TAllDeals; vDatadirectory:AnsiString; vSeminarCode:AnsiString) : Integer;
    var
      vFile    : file of TAllDeals;
      vFileName   : String;
      vTempResult : integer;
    begin
      vFileName := vDataDirectory +  NegotiationsFileName + vSeminarCode;
      if FileExists(vFileName) = false then
      begin
          Writeln('decision file does not exist:' + vFileName);
          Result := -1;
          exit;
      end;

      try
        AssignFile( vFile, vFileName );
        Reset( vFile );
        if ( pPeriodNumber < HistoryEnd ) then pPeriodNumber := HistoryEnd;
        Seek( vFile, pPeriodNumber - HistoryStart);
        Write( vFile, pDecision);
        CloseFile( vFile );
        vTempResult := 0;
      except
        on E: EInOutError do
        begin
       //   showMsg(exceptionlist, 'Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + vFileName + #13 + #10 + E.Message );
          vTempResult := E.ErrorCode;
          CloseFile( vFile );
        end;
      end;
      Result := vTempResult;

    end;


   function variantsDetailsSchema(var curVariantDetails: TVariantDetails): ISuperObject;
    var
      jo: ISuperObject;
      mkt: Integer;
    begin
      jo  := SO;
//var variantsDetailsSchema = mongoose.Schema({
//    varID : Number,
//    dateOfBirth : Number,
//    dateOfDeath : Number,
//    useMarketsDetails : Boolean,
//    marketsDetails : [Number]
//})
      jo.I['varID'] := curVariantDetails.niv_VarID;
      jo.I['dateOfBirth'] := curVariantDetails.niv_DateofBirth;
      jo.I['dateOfDeath'] := curVariantDetails.niv_DateOfDeath;
      jo.B['useMarketsDetails'] := curVariantDetails.niv_UseMarketsDetails;
      jo.O['marketsDetails']  := SA([]);
      for mkt := Low(TMarketsTotal) to High(TMarketsTotal) do
        jo.A['marketsDetails'].D[mkt - 1] := curVariantDetails.niv_MarketsDetails[mkt];

      Result  := jo;
    end;

    function brandDetailsSchema(var curBrandDetails: TBrandDetails): ISuperObject;
    var
      jo: ISuperObject;
      mkt,vnt: Integer;
    begin
      jo  := SO;
//var brandDetailsSchema = mongoose.Schema({
//    brandID : Number,
//    dateOfBirth : Number,
//    dateOfDeath : Number,
//    marketsDetails : [Number],
//    useVariantsDetails : Boolean,
//    useMarketsDetails : Boolean,
//    variantsDetails : [variantsDetailsSchema] //length: TOneBrandVars
//})
      jo.I['brandID'] := curBrandDetails.nib_BrandID;
      jo.I['dateOfBirth'] := curBrandDetails.nib_DateofBirth;
      jo.I['dateOfDeath'] := curBrandDetails.nib_DateOfDeath;
      jo.B['useVariantsDetails']  := curBrandDetails.nib_UseVariantsDetails;
      jo.B['useMarketsDetails'] := curBrandDetails.nib_UseMarketsDetails;
      jo.O['marketsDetails']  := SA([]);
      for mkt := Low(TMarketsTotal) to High(TMarketsTotal) do
        jo.A['marketsDetails'].D[mkt - 1] := curBrandDetails.nib_MarketsDetails[mkt];
      jo.O['variantsDetails'] := SA([]);
      for vnt := Low(TOneBrandVariants) to High(TOneBrandVariants) do
        jo.A['variantsDetails'].Add( variantsDetailsSchema(curBrandDetails.nib_VariantsDetails[vnt]) );

      Result  := jo;
    end;

    function categoryDetailsSchema(var curCatDetails: TCategoryDetails): ISuperObject;
    var
      jo: ISuperObject;
      mkt, brn: Integer;
    begin
      jo  := SO;
//var categoryDetailsSchema = mongoose.Schema({
//    marketsDetails : [Number], //Length: TMarketTotal
//    useBrandsDetails : Boolean,
//    useMarketsDetails : Boolean,
//    brandsDetails : [brandDetailsSchema], //Length: TProBrands
//})
      jo.B['useBrandsDetails']  := curCatDetails.nic_UseBrandsDetails;
      jo.B['useMarketsDetails'] := curCatDetails.nic_UseMarketsDetails;
      jo.O['marketsDetails']  := SA([]);
      for mkt := Low(TMarketsTotal) to High(TMarketsTotal) do
        jo.A['marketsDetails'].D[ mkt - 1 ] := curCatDetails.nic_MarketsDetails[mkt];
      jo.O['brandsDetails'] := SA([]);
      for brn := Low(TProBrands) to High(TProBrands) do
        jo.A['brandsDetails'].Add( brandDetailsSchema(curCatDetails.nic_BrandsDetails[brn]) );

      Result  := jo;
    end;

    function categoryDealSchema(var curCatDeal: TCategoryDeal): ISuperObject;
    var
      jo: ISuperObject;
    begin
      jo  := SO;
//var categoryDealSchema = mongoose.Schema({
//    categoryID : Number,
//    consignementVolume     : categoryDetailsSchema;
//    inStoreActivitiesFee   : categoryDetailsSchema;
//    minimumOrder           : categoryDetailsSchema;
//    otherCompensation      : categoryDetailsSchema;
//    paymentDays            : categoryDetailsSchema;
//    performanceBonusAmount : categoryDetailsSchema;
//    performanceBonusRate   : categoryDetailsSchema;
//    promotionalSupport     : categoryDetailsSchema;
//    salesTargetVolume      : categoryDetailsSchema;
//    volumeDiscountRate     : categoryDetailsSchema;
//})
      jo.I['categoryID']  := curCatDeal.nc_CategoryID;
      jo.O['consignementVolume']  := categoryDetailsSchema(curCatDeal.nc_ConsignementVolume);
      jo.O['inStoreActivitiesFee']  := categoryDetailsSchema(curCatDeal.nc_InStoreActivitiesFee);
      jo.O['minimumOrder']  := categoryDetailsSchema(curCatDeal.nc_MinimumOrder);
      jo.O['otherCompensation'] := categoryDetailsSchema(curCatDeal.nc_OtherCompensation);
      jo.O['paymentDays'] := categoryDetailsSchema(curCatDeal.nc_PaymentDays);
      jo.O['performanceBonusAmount']  := categoryDetailsSchema(curCatDeal.nc_PerformanceBonusAmount);
      jo.O['performanceBonusRate']  := categoryDetailsSchema(curCatDeal.nc_PerformanceBonusRate);
      jo.O['promotionalSupport']  := categoryDetailsSchema(curCatDeal.nc_PromotionalSupport);
      jo.O['salesTargetVolume'] := categoryDetailsSchema(curCatDeal.nc_SalesTargetVolume);
      jo.O['volumeDiscountRate']  := categoryDetailsSchema(curCatDeal.nc_VolumeDiscountRate);

      Result  := jo;
    end;

    function retailerDealSchema(producer, retailer: Integer): ISuperObject;
    var
      jo: ISuperObject;
      cat: Integer;
    begin
      jo  := SO;
//var retailerDealSchema = mongoose.Schema({
//    retailerID : Number,
//    categoryDeal : [categoryDealSchema]
//})
      jo.I['retailerID']  := retailer;
      jo.O['categoryDeal']  :=  SA([]);
      for cat := Low(TCategories) to High(TCategories) do
        jo.A['categoryDeal'].Add( categoryDealSchema(currentAllDeals[producer, retailer].neg_CategoriesDeals[cat]) );

      Result  := jo;
    end;

    function producerDealSchema(producer: Integer): ISuperObject;
    var
      jo: ISuperObject;
      retailer  : TBMRetailers;
    begin
      jo  := SO;
//var producerDealSchema = mongoose.Schema({
//    producerID : Number,
//    retailerDealSchema : [retailerDealSchema]
//})
      jo.I['producerID']  := producer;
      jo.O['retailerDeal']  := SA([]);
      for retailer := Low(TBMRetailers) to High(TBMRetailers) do
        jo.A['retailerDeal'].Add(retailerDealSchema(producer, retailer) );

      Result  := jo;
    end;

    function allDealSchema(var curAllDeals : TAllDeals): ISuperObject;
    var
      jo : ISuperObject;
      producer : TAllProducers;
    begin
      jo := SO;
//var allDealSchema = mongoose.Schema({
//    period : Number,
//    seminar : String,
//    producerDeal : [producerDealSchema] //length: TAllProducers(1~4)
//})
      jo.I['period']  := currentPeriod;
      jo.S['seminar'] := currentSeminar;
      jo.O['producerDeal']  := SA([]);
      for producer := Low(TAllProducers) to High(TAllProducers) do
          jo.A['producerDeal'].Add( producerDealSchema( producer ) );

      result  := jo;
    end;

    procedure makeJson();
    var
      s_str : string;
    begin
      oJsonFile := SO;
      oJsonFile := allDealSchema(currentAllDeals);
      s_str := 'out' + '.json';
      writeln( oJsonFile.AsJSon(False,False));
      oJsonFile.SaveTo(s_str, true, false);
    end;

    procedure fromJSONvariantsDetailsSchema(var curVariantDetails: TVariantDetails; jo: ISuperObject);
    var
      mkt: Integer;
    begin
//var variantsDetailsSchema = mongoose.Schema({
//    varID : Number,
//    dateOfBirth : Number,
//    dateOfDeath : Number,
//    useMarketsDetails : Boolean,
//    marketsDetails : [Number]
//})
      curVariantDetails.niv_VarID := jo.I['varID'];
      curVariantDetails.niv_DateofBirth := jo.I['dateOfBirth'];
      curVariantDetails.niv_DateOfDeath := jo.I['dateOfDeath'];
      curVariantDetails.niv_UseMarketsDetails := jo.B['useMarketsDetails'];
      for mkt := Low(TMarketsTotal) to High(TMarketsTotal) do
        curVariantDetails.niv_MarketsDetails[mkt] := jo.A['marketsDetails'].D[mkt - 1];
    end;

    procedure fromJSONbrandDetailsSchema(var curBrandDetails: TBrandDetails; jo: ISuperObject);
    var
      mkt,vnt: Integer;
    begin
//var brandDetailsSchema = mongoose.Schema({
//    brandID : Number,
//    dateOfBirth : Number,
//    dateOfDeath : Number,
//    marketsDetails : [Number],
//    useVariantsDetails : Boolean,
//    useMarketsDetails : Boolean,
//    variantsDetails : [variantsDetailsSchema] //length: TOneBrandVars
//})
      //jo.SaveTo('Brands.txt', TRUE, TRUE);
      //Log(jo.AsString);
      Log('Deal with brand : '+ inttostr(jo.I['brandID']));
      curBrandDetails.nib_BrandID := jo.I['brandID'];
      curBrandDetails.nib_DateofBirth := jo.I['dateOfBirth'];
      curBrandDetails.nib_DateOfDeath := jo.I['dateOfDeath'];
      curBrandDetails.nib_UseVariantsDetails  := jo.B['useVariantsDetails'];
      curBrandDetails.nib_UseMarketsDetails := jo.B['useMarketsDetails'];
      if curBrandDetails.nib_UseMarketsDetails then
        for mkt := Low(TMarketsTotal) to High(TMarketsTotal) do
          curBrandDetails.nib_MarketsDetails[mkt] := jo.A['marketsDetails'].D[mkt - 1];

      if curBrandDetails.nib_UseVariantsDetails then
        for vnt := Low(TOneBrandVariants) to High(TOneBrandVariants) do
        begin
          if (jo.A['variantsDetails'].length <> 0) then
          begin
            fromJSONvariantsDetailsSchema(curBrandDetails.nib_VariantsDetails[vnt], jo.A['variantsDetails'].O[vnt - 1] );
          end;
        end;
    end;

    procedure fromJSONcategoryDetailsSchema(var curCatDetails: TCategoryDetails; jo: ISuperObject);
    var
      mkt, brn: Integer;
    begin
//var categoryDetailsSchema = mongoose.Schema({
//    marketsDetails : [Number], //Length: TMarketTotal
//    useBrandsDetails : Boolean,
//    useMarketsDetails : Boolean,
//    brandsDetails : [brandDetailsSchema], //Length: TProBrands
//})
      Log('category details');
      curCatDetails.nic_UseBrandsDetails  := jo.B['useBrandsDetails'];
      curCatDetails.nic_UseMarketsDetails := jo.B['useMarketsDetails'];

//      if curCatDetails.nic_UseMarketsDetails then
//         for mkt := Low(TMarketsTotal) to High(TMarketsTotal) do
//          curCatDetails.nic_MarketsDetails[mkt] := jo.A['marketsDetails'].D[ mkt - 1 ];


     // if curCatDetails.nic_UseBrandsDetails then
     // Log(jo.AsString);
        for brn := Low(TProBrands) to High(TProBrands) do
        begin
          if (jo.A['brandsDetails'].Length <> 0) then
          begin
            fromJSONbrandDetailsSchema(curCatDetails.nic_BrandsDetails[brn], jo.A['brandsDetails'].O[brn - 1] );
          end;
        end;

    end;

    procedure fromJSONcategoryDealSchema(var curCatDeal: TCategoryDeal; jo: ISuperObject);
    begin
//var categoryDealSchema = mongoose.Schema({
//    categoryID : Number,
//    consignementVolume     : categoryDetailsSchema;
//    inStoreActivitiesFee   : categoryDetailsSchema;
//    minimumOrder           : categoryDetailsSchema;
//    otherCompensation      : categoryDetailsSchema;
//    paymentDays            : categoryDetailsSchema;
//    performanceBonusAmount : categoryDetailsSchema;
//    performanceBonusRate   : categoryDetailsSchema;
//    promotionalSupport     : categoryDetailsSchema;
//    salesTargetVolume      : categoryDetailsSchema;
//    volumeDiscountRate     : categoryDetailsSchema;
//})
      Log('Deal with curCatDeal :' + IntToStr(jo.I['categoryID']));
      curCatDeal.nc_CategoryID  := jo.I['categoryID'];
      fromJSONcategoryDetailsSchema(curCatDeal.nc_ConsignementVolume, jo.O['consignementVolume']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_InStoreActivitiesFee, jo.O['inStoreActivitiesFee']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_MinimumOrder, jo.O['minimumOrder']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_OtherCompensation, jo.O['otherCompensation']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_PaymentDays, jo.O['paymentDays']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_PerformanceBonusAmount, jo.O['performanceBonusAmount']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_PerformanceBonusRate, jo.O['performanceBonusRate']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_PromotionalSupport, jo.O['promotionalSupport']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_SalesTargetVolume, jo.O['salesTargetVolume']);
      fromJSONcategoryDetailsSchema(curCatDeal.nc_VolumeDiscountRate, jo.O['volumeDiscountRate']);
    end;



    procedure fromJSONretailerDealSchema(var curDeal: TOnePairDeal; jo: ISuperObject);
    var
      cat: Integer;
    begin
//var retailerDealSchema = mongoose.Schema({
//    retailerID : Number,
//})
      for cat := Low(TCategories) to High(TCategories) do
        fromJSONcategoryDealSchema(curDeal.neg_CategoriesDeals[cat], jo.A['categoryDeal'].O[cat -1] );
    end;

    procedure fromJSONallDealSchema(var curAllDeals : TAllDeals; jo: ISuperObject);
    var
      producer : TAllProducers;
      retailer  : TBMRetailers;
      jp, jr: ISuperObject;
    begin
//var allDealSchema = mongoose.Schema({
//    period : Number,
//    seminar : String,
//    producerDeal : [producerDealSchema]
//})
      currentPeriod  := jo.I['period'];
      currentSeminar := jo.S['seminar'];
      for producer := Low(TAllProducers) to High(TAllProducers) do
        for retailer := Low(TBMRetailers) to High(TBMRetailers) do
          begin
            jp  := jo.A['producerDeal'].O[producer - 1];
            jr  := jp.A['retailerDeal'].O[retailer - 1];
            currentAllDeals[producer, retailer].neg_RetailerID := retailer;
            currentAllDeals[producer, retailer].neg_ProducerID := producer;
            
            Log('Deal with currentAllDeals[' + IntToStr(producer) + ', ' + IntToStr(retailer) + ']');
            fromJSONretailerDealSchema( currentAllDeals[producer, retailer], jr );
          end;

//          fromJSONproducerDealSchema( currentAllDeals[producer, retailer], retailer, jo.A['producerDeal'].O[producer - 1]);
    end;

   function DecodeUrl(url: string): string;
    var
      x: integer;
      ch: string;
      sVal: string;
      Buff: string;
    begin
      //Init
      Buff := '';
      x := 1;
      while x <= Length(url) do
      begin
        //Get single char
        ch := url[x];

        if ch = '+' then
        begin
          //Append space
          Buff := Buff + ' ';
        end
        else if ch <> '%' then
        begin
          //Append other chars
          Buff := Buff + ch;
        end
        else
        begin
          //Get value
          sVal := Copy(url, x + 1, 2);
          //Convert sval to int then to char
          Buff := Buff + char(StrToInt('$' + sVal));
          //Inc counter by 2
          Inc(x, 2);
        end;
        //Inc counter
        Inc(x);
      end;
      //Return result
      Result := Buff;
    end;

   function getJson(): ISuperObject;
   var
      vStr  : string;
      jo  : ISuperObject;
   begin
      vStr := '';
      jo := SO;
      Log('Try to get jsonData...');
      if sListData.IndexOfName('jsonData') <> -1 then
      begin
          Log('Found jsonData, trying to decode...');
          vStr := DecodeUrl(sListData.Values['jsonData']);
         // Log('Decode result:' + vStr);
      end
      else
        Writeln('Error 400' + #13 + #10 + 'No JSON data provided');

      jo  := SO(vStr);
      Result  := jo;
   end;

  procedure LoadConfigIni(vseminar : string);
  var
  ini : Tinifile;
  begin
    ini := TIniFile.Create(ExtractFilePath(ParamStr(0)) + 'CgiConfig.ini');
    with ini do
    begin
      DataDirectory := ini.ReadString('Options','DataDirectory','C:\E-project\ecgi\');
      DataDirectory := DataDirectory + vseminar + '\';
      ini.Free;
    end;
  end;

begin
  SetMultiByteConversionCodePage(CP_UTF8);
  sDati := '';
  sListData := TStringList.Create;
  sResponseData := TStringList.Create;
  sLogList := TStringList.Create;
  sResponseData.Clear;
  sListData.Clear;
  sLogList.Clear;
  try

    WriteLn('Content-type: application/json');
    sValue := getVariable('REQUEST_METHOD');
    // GET
    //Parameters: period, seminar
    //Route example: …/negotiationDecision?period=1&seminar=MAY
    //Schema: negotiationDecision.js
    //Response:
    //status code 200, Data has been written into binary file successfully
    //status code 500, with debug information if something goes wrong during writing process
    if sValue='GET' then
      begin
        sValue := getVariable('QUERY_STRING');
        Explode(sValue, sListData);
        // initialize globals
        currentSeminar := getSeminar(sListData);
        currentPeriod := getPeriod(sListData);
        //generate dataDirectory depends on seminar
        LoadConfigIni(currentSeminar);
        {** Read results file **}
        vReadRes := ReadNegoRecordByProDecision(currentPeriod,currentAllDeals,
          DataDirectory,currentSeminar); // read Nego file

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
      end
    else
    // POST
    //Parameters: null
    //Post request content: single JSON record defined in schema
    //Route example: …/negotiationDecision
    //Schema: negotiationDecision.js
    //Response:
    //status code 200, Data has been written into binary file successfully
    //status code 500, with debug information if something goes wrong during writing process
    begin
      sValue := trim(getVariable('CONTENT_LENGTH'));
      if (sValue<>'') then
      begin
        iSize := strtoint(sValue);
        SetLength(sDati,iSize);
        bUpload := false;

        sValue := getVariable('HTTP_CONTENT_TYPE');
        if (Trim(sValue)<>'') and (Trim(sValue) <> 'application/x-www-form-urlencoded') then
            bUpload := true; // There is an attached file
            // We my use this mechanism if we want to, i.e. reading JSON
        for i:=1 to iSize do
          Read(sDati[i]);
        if bUpload then
          sListData.Add(sDati)
        else
          Explode(sDati, sListData);

        // initialize globals
        // read JSON data from post field
        oJsonFile := getJson;

        // these work only if JSON is correct, that is it keeps them
        currentSeminar := oJsonFile.S['seminar'];
        currentPeriod := oJsonFile.I['period'];
        // initiate temporary binary structure with 0
        FillChar(currentAllDeals, SizeOf(TALLDeals), #0);

        // now we have process JSON and convert it into binary stucture
        fromJSONallDealSchema(currentAllDeals, oJsonFile);
        //generate dataDirectory depends on seminar
        LoadConfigIni(currentSeminar);
        // write tranlated JSON to binary file
        vReadRes := WriteNegoDecisionRecord(currentPeriod,
          currentAllDeals,DataDirectory,currentSeminar); // update Decision file

        // shake hands
        if vReadRes <> 0 then
        begin
          Writeln('Status: 400 Bad Request');
          WriteLn;
        end
        else
        //Read result successfully, generate JSON and writeln
        begin
          Writeln('Status: 200 OK');
          WriteLn;
        end;
      end;
    end;
    for i:= 0 to sResponseData.Count-1 do
    WriteLn(sResponseData[i]);

  finally
    sLogList.saveToFile(GetCurrentDir + '/Log.txt');
    sListData.Free;
    sLogList.Free;
    sResponseData.Free;
  end;
end.

