define(['directives', 'services'], function(directives){

    directives.directive('supplierGeneralMarketing', ['ProducerDecisionBase','ProducerDecision','Label','SeminarInfo','$http','$location','$filter','PeriodInfo','$q','PlayerInfo', function(ProducerDecisionBase,ProducerDecision,Label, SeminarInfo, $http,$location,$filter, PeriodInfo, $q,PlayerInfo){
        return {
            scope : {
                isPageShown : '=',
                isPageLoading : '='
            },
            restrict : 'E',
            templateUrl : '../../partials/singleReportTemplate/SD_generalMarketing.html',            
            link : function(scope, element, attrs){                   

                var initializePage = function(){
                    console.log('initializePage some small...');                    
                    scope.isPageLoading = true;
                    scope.isResultShown = false;                    
                    scope.Label = Label;

                    scope.currentPeriod=PeriodInfo.getCurrentPeriod();
                    ProducerDecisionBase.reload({producerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar()}).then(function(base){
                        scope.pageBase = base; 
                    }).then(function(){
                        return showView();
                    }), function(reason){
                        console.log('from ctr: ' + reason);
                    }, function(update){
                        console.log('from ctr: ' + update);
                    };                   
                }

                var loadSelectCategory=function(category){
                    var d=$q.defer();
                    var count=0;
                    var brands=new Array();
                    var allProCatDecisions=_.filter(scope.pageBase.proCatDecision,function(obj){
                        if(category=="HealthBeauty"){
                            return (obj.categoryID==2);
                        }else{
                            return (obj.categoryID==1);
                        }
                    });
                    for(var i=0;i<allProCatDecisions.length;i++){
                        for(var j=0;j<allProCatDecisions[i].proBrandsDecision.length;j++){
                            if(allProCatDecisions[i].proBrandsDecision[j]!=undefined&&allProCatDecisions[i].proBrandsDecision[j].brandID!=undefined&&allProCatDecisions[i].proBrandsDecision[j].brandID!=0){
                                allProCatDecisions[i].proBrandsDecision[j].advertisingOffLine[0]=allProCatDecisions[i].proBrandsDecision[j].advertisingOffLine[0].toFixed(2);
                                allProCatDecisions[i].proBrandsDecision[j].advertisingOffLine[1]=allProCatDecisions[i].proBrandsDecision[j].advertisingOffLine[1].toFixed(2);
                                allProCatDecisions[i].proBrandsDecision[j].advertisingOnLine=allProCatDecisions[i].proBrandsDecision[j].advertisingOnLine.toFixed(2);
                                allProCatDecisions[i].proBrandsDecision[j].supportTraditionalTrade[0]=allProCatDecisions[i].proBrandsDecision[j].supportTraditionalTrade[0].toFixed(2);
                                allProCatDecisions[i].proBrandsDecision[j].supportTraditionalTrade[1]=allProCatDecisions[i].proBrandsDecision[j].supportTraditionalTrade[1].toFixed(2);
                                brands.push(allProCatDecisions[i].proBrandsDecision[j]);
                                count++;
                            }
                        }
                    }
                    if(count!=0){
                        result=1;
                        d.resolve();
                    }else{
                        d.reject(Label.getContent('load brands fail'));
                    }
                    if(category=="Elecssories"){
                        scope.brandes=brands;
                    }else{
                        scope.brandhs=brands;
                    }
                }

                scope.checkData=function(category,brandName,location,tep,index,value){
                    var d=$q.defer();
                    var categoryID,max,result,r1ContractExpend,r2ContractExpend;
                    var filter=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
                    if(!filter.test(value)){
                        d.resolve(Label.getContent('Input a number'));
                    }
                    var url="/companyHistoryInfo/"+SeminarInfo.getSelectedSeminar()+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/P/'+parseInt(PlayerInfo.getPlayer());
                    $http({
                        method:'GET',
                        url:url
                    }).then(function(data){
                        max=data.data.budgetAvailable + data.data.budgetSpentToDate;
                        url='/getContractExpend/'+SeminarInfo.getSelectedSeminar()+'/'+PeriodInfo.getCurrentPeriod()+'/'+PlayerInfo.getPlayer()+'/1/brandName/varName';
                        return $http({
                            method:'GET',
                            url:url
                        });
                    }).then(function(data){
                        r1ContractExpend = data.data.result;
                        url='/getContractExpend/'+SeminarInfo.getSelectedSeminar()+'/'+PeriodInfo.getCurrentPeriod()+'/'+PlayerInfo.getPlayer()+'/2/brandName/varName';
                        return $http({
                            method:'GET',
                            url:url
                        });
                    }).then(function(data){
                        r2ContractExpend = data.data.result;
                        url="/producerExpend/"+SeminarInfo.getSelectedSeminar()+'/'+(PeriodInfo.getCurrentPeriod())+'/'+parseInt(PlayerInfo.getPlayer())+'/'+brandName+'/'+location+'/'+tep;
                        return $http({
                            method:'GET',
                            url:url
                        });
                    }).then(function(data){
                        if(parseInt(data.data.result)+parseInt(value)>max-r1ContractExpend-r2ContractExpend){
                            d.resolve(Label.getContent('Input range')+':0~'+(max-r1ContractExpend-r2ContractExpend-data.data.result));
                        }else{
                            d.resolve();
                        }
                    },function(data){
                        d.resolve(Label.getContent('fail'));
                    });
                    return d.promise;
                }

                scope.updateProducerDecision=function(category,brandName,location,tep,index){
                    var categoryID;
                    if(category=="Elecssories"){
                        categoryID=1;
                            if(location=="supportTraditionalTrade"||location=="advertisingOffLine"){
                            ProducerDecisionBase.setProducerDecisionBrand(categoryID,brandName,location,tep,scope.brandes[index][location][tep]);                           
                        }
                        else{
                            ProducerDecisionBase.setProducerDecisionBrand(categoryID,brandName,location,tep,scope.brandes[index][location]);                                                    
                        }
                    }
                    else{
                        categoryID=2;
                        if(location=="supportTraditionalTrade"||location=="advertisingOffLine"){
                            ProducerDecisionBase.setProducerDecisionBrand(categoryID,brandName,location,tep,scope.brandhs[index][location][tep]);                           
                        }
                        else{
                            ProducerDecisionBase.setProducerDecisionBrand(categoryID,brandName,location,tep,scope.brandhs[index][location]);                                                    
                        }
                    }
                }

                var showView=function(){
                    var d=$q.defer();
                    loadSelectCategory('Elecssories');
                    loadSelectCategory('HealthBeauty');
                    scope.isResultShown = true;
                    scope.isPageLoading = false;
                    return d.promise;       
                }

                scope.$watch('isPageShown', function(newValue, oldValue){
                    if(newValue==true) {
                        initializePage();
                    }
                });
                scope.$on('producerDecisionBaseChangedFromServer', function(event, data, newBase) {                    
                        //decision base had been updated, re-render the page with newBase
                        scope.pageBase = newBase;
                        showView();
                });

            }
        }
    }])
})