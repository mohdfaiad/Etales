﻿program BG_companyHistoryInfo;

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
  Classes, superobject, HCD_SystemDefinitions, System.TypInfo, inifiles, CgiCommonFunction;

const
  DecisionFileName = 'Negotiations.';
  dummyNo = 0;
  dummySeminar = 'MAY';
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

   currentResult : TAllResults;
   currentPeriod : TPeriodNumber;
   currentSeminar : string;
   vReadRes : Integer;

   oJsonFile : ISuperObject;
   sFile  : string;

 
  function producerViewSchema(pProducer: Integer): ISuperObject;
  var
    jo: ISuperObject;
    DLvolume : ISuperObject;
    TLvolume : ISuperObject;

    vProd: TSupplierConfidentialReport;
    I, DL, TL: Integer;
    MyArr: array[0..10] of Integer;
  begin
    jo  := SO;

    vProd := currentResult.r_SuppliersConfidentialReports[pProducer];
    jo.I['producerID']  := pProducer;
    jo.D['budgetAvailable'] := vProd.scr_Info.scrInfo_BudgetAvailable;
    jo.D['budgetOverspent'] := vProd.scr_Info.scrInfo_BudgetOverspent;
    jo.D['budgetSpentToDate'] := vProd.scr_Info.scrInfo_BudgetSpentToDate;

    jo.D['initialBudget'] := vProd.scr_Info.scrInfo_InitialBudget;
    jo.D['budgetExtensions'] := vProd.scr_Info.scrInfo_BudgetExtensions;
    jo.D['totalPreviousMarketing'] := vProd.scr_Info.scrInfo_TotalPreviousMarketing;
    jo.D['totalPreviousTradeSupport'] := vProd.scr_Info.scrInfo_TotalPreviousTradeSupport;

    jo.O['productionCapacity']  := SA([]);
    jo.O['acquiredTechnologyLevel']  := SA([]);
    jo.O['acquiredProductionFlexibility']  := SA([]);
    jo.O['acquiredDesignLevel']  := SA([]);

    jo.O['cumulatedDesignVolume'] := SA([]);
    jo.O['cumulatedTechnologyVolume'] := SA([]);
    for I := Low(TCategories) to High(TCategories) do
    begin
      jo.A['productionCapacity'].D[I - 1]  := vProd.scr_Info.scrInfo_ProductionCapacity[I];
      jo.A['acquiredTechnologyLevel'].D[I - 1]  := vProd.scr_Info.scrInfo_AcquiredTechnologyLevel[I];
      jo.A['acquiredProductionFlexibility'].D[I - 1]  := vProd.scr_Info.scrInfo_AcquiredProductionFlexibility[I];
      jo.A['acquiredDesignLevel'].D[I - 1]  := vProd.scr_Info.scrInfo_AcquiredDesignLevel[I];

      DLvolume := SA([]);
      for DL := Low(TDesign) to High(TDesign) do
      begin
        DLvolume.D[ inttoStr(DL-1) ] := vProd.scr_Info.scrInfo_CumulatedDesignVolume[I, DL];
      end;
      jo.A['cumulatedDesignVolume'].Add(DLvolume);

      TLvolume := SA([]);
      for TL := Low(TTechnology) to High(TTechnology) do
      begin
       TLvolume.D[inttostr(TL-1)] := vProd.scr_Info.scrInfo_CumulatedTechnologyVolume[I, TL];
      end;
      jo.A['cumulatedTechnologyVolume'].Add(TLvolume);

    end;


    result  := jo;
  end;

  function retailerViewSchema(vRetailer: Integer): ISuperOBject;
  var
    jo: ISuperObject;
    vRet: TRetailerConfidentialReport;
  begin
    jo  := SO;
//var retailerViewSchema = mongoose.Schema({
//	retailerID : Number, (1~4)
//	//rr....
//	budgetAvailable : Number,
//	budgetOverspent : Number,
//	budgetSpentToDate : Number
//})
    vRet  := currentResult.r_RetailersConfidentialReports[vRetailer];
    jo.I['retailerID']  := vRetailer;
    jo.D['budgetAvailable'] := vRet.rcr_Info.rcrInfo_BudgetAvailable;
    jo.D['budgetOverspent'] := vRet.rcr_Info.rcrInfo_BudgetOverspent;
    jo.D['budgetSpentToDate'] := vRet.rcr_Info.rcrInfo_BudgetSpentToDate;

    jo.D['initialBudget'] := vRet.rcr_Info.rcrInfo_InitialBudget;
    jo.D['budgetExtensions'] := vRet.rcr_Info.rcrInfo_BudgetExtensions;               
    jo.D['budgetIncreaseFromNegotiations'] := vRet.rcr_Info.rcrInfo_BudgetIncreaseFromNegotiations;
    Result  := jo;    
  end;

  function companyHistoryInfoSchema(): ISuperObject;
  var
    jo: ISuperObject;
    prd, ret: Integer;
  begin
    jo  := SO;
//var companyHistoryInfoSchema = mongoose.Schema({
//	period : Number,
//	seminar : String,
//	companyID : Number, (1~9)
//	producerView : [producerViewSchema], //1~4
//	retailerView : [retailerViewSchema]  //1~4
//})
    jo.I['period']  := currentPeriod;
    jo.S['seminar'] := currentSeminar;
    jo.O['producerView']  := SA([]);
    for prd := Low(TAllProducers) to High(TAllProducers) do
      jo.A['producerView'].Add( producerViewSchema(prd) );
    jo.O['retailerView']  := SA([]);
    for ret := Low(TBMRetailers) to High(TBMRetailers) do
      jo.A['retailerView'].Add( retailerViewSchema(ret) );     
      
    result  := jo;
  end;

    procedure makeJson();
    var
      s_str : string;
    begin
      oJsonFile := SO;
      oJsonFile := companyHistoryInfoSchema;

      s_str := 'out' + '.json';
      writeln( oJsonFile.AsJSon(False,False));
      oJsonFile.SaveTo(s_str, true, false);
    end;

begin

    SetMultiByteConversionCodePage(CP_UTF8);
    sDati := '';
    sListData := TStringList.Create;
    sListData.Clear;

  try

    WriteLn('Content-type: application/json');
    Writeln;

    sValue := getVariable('REQUEST_METHOD');
    if sValue='GET' then
      begin
        // GET
        sValue := getVariable('QUERY_STRING');
        Explode(sValue, sListData);
        LoadConfigIni(DataDirectory, getSeminar(sListData));
    // initialize globals
        currentSeminar := getSeminar(sListData);
        currentPeriod := getPeriod(sListData);

    {** Read results file **}
        vReadRes := ReadResults(currentPeriod, currentSeminar, DataDirectory,
          currentResult); // read Results file

    // Now let's make some JSON stuff here
        if vReadRes = 0 then
          makeJson;
      end


  finally
    sListData.Free;
  end;
end.

