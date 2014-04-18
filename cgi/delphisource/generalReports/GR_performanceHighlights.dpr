﻿program GR_performanceHighlights;


uses
  SysUtils,Windows,Classes, superobject, HCD_SystemDefinitions, System.TypInfo, inifiles,
  CgiCommonFunction;

var
  DataDirectory : string;
  sListData: tStrings;
  sValue : string;

  currentResult : TAllResults;
  currentPeriod : TPeriodNumber;
  currentSeminar : string;
  vReadRes : Integer;
  oJsonFile : ISuperObject;

  function actorCategoryInfoSchema(actorID : Integer; catID : integer; binaryReport : TGR_PerformanceHighlights): ISuperObject;
  var
    jo : ISuperObject;
  begin
    jo := SO;
    jo.I['categoryID'] := catID;
    jo.D['grph_SalesVolume'] := binaryReport.grph_SalesVolume[actorID, catID];
    jo.D['grph_NetSalesValue'] := binaryReport.grph_NetSalesValue[actorID, catID];    

    jo.D['grph_ValueMarketShare'] := binaryReport.grph_ValueMarketShare[actorID, catID];
    jo.D['grph_VolumeMarketShare'] := binaryReport.grph_VolumeMarketShare[actorID, catID];

    jo.D['grph_NetSalesValueChange'] := binaryReport.grph_NetSalesValueChange[actorID, catID];
    jo.D['grph_ValueMarketShareChange'] := binaryReport.grph_ValueMarketShareChange[actorID, catID];
    jo.D['grph_VolumeMarketShareChange'] := binaryReport.grph_VolumeMarketShareChange[actorID, catID];
    jo.D['grph_SalesVolumeChange'] := binaryReport.grph_SalesVolumeChange[actorID, catID];

    result := jo;
  end;

  //TActiveActors : 1~(3+2)
  //TActors : 1~(4+3)
  function ActorToActiveActors(ActorID : Integer): Integer;
  var 
    activeActorID : integer;
  begin
    case (ActorID) of
      1 : 
      begin
        activeActorID := 1;
      end;
      2 : 
      begin
        activeActorID := 2;
      end;
      3 : 
      begin
        activeActorID := 3;
      end;
      4 : 
      begin
        activeActorID := -1; 
      end;
      5 : 
      begin
        activeActorID := 4;        
      end;
      6 :
      begin
        activeActorID := 5;
      end;
      7 :
      begin
        activeActorID := -1;
      end;
      else
        activeActorID := -1;
      end;

      result := activeActorID;
  end;

  function actorInfoSchema(actorID : Integer; binaryReport : TGR_PerformanceHighlights): ISuperObject;
  var
    jo: ISuperObject;
    I, cat: Integer;
  begin
    jo := SO;
    jo.I['actorID'] := actorID;

    if ActorToActiveActors(actorID) <> -1 then
    begin
      jo.D['grph_OperatingProfit'] := binaryReport.grph_OperatingProfit[ActorToActiveActors(actorID)];
      jo.D['grph_OperatingProfitChange'] := binaryReport.grph_OperatingProfitChange[ActorToActiveActors(actorID)];
      jo.D['grph_CumulativeInvestment'] := binaryReport.grph_CumulativeInvestment[ActorToActiveActors(actorID)];      
    end
    else
    begin
      jo.D['grph_OperatingProfit'] := -1;
      jo.D['grph_OperatingProfitChange'] := -1;
      jo.D['grph_CumulativeInvestment'] := -1;
    end;
    
    jo.O['actorCategoryInfo'] := SA([]);
    for cat := Low(TCategoriesTotal) to High(TCategoriesTotal) do
      jo.A['actorCategoryInfo'].Add( actorCategoryInfoSchema(actorID, cat, binaryReport) );

    result := jo;
  end;

  procedure makeJson();
  var
    s_str : string;
    actorID : Integer;
  begin
    oJsonFile := SO;
    oJsonFile.S['seminar'] := currentSeminar;
    oJsonFile.I['period'] := currentPeriod;
    oJsonFile.O['actorInfo'] := SA([]);
    for actorID := Low(TActors) to High(TActors) do
      oJsonFile.A['actorInfo'].Add( actorInfoSchema(actorID, currentResult.r_GeneralReport.gr_PerformanceHighlights) );

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
     // WriteLn('Content-type: text/html\n\n');

      sValue := getVariable('REQUEST_METHOD');
      if sValue='GET' then
      begin
          sValue := getVariable('QUERY_STRING');
          Explode(sValue, sListData);
          LoadConfigIni(DataDirectory, getSeminar(sListData));
          // initialize globals
          currentSeminar := getSeminar(sListData);
          currentPeriod := getPeriod(sListData);
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

