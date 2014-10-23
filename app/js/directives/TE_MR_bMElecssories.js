define(['directives', 'services'], function(directives){

    directives.directive('marketBMElecssories', ['Label','SeminarInfo','$http','PeriodInfo','$q', function(Label, SeminarInfo, $http, PeriodInfo, $q){
        return {
            scope : {
                isPageShown : '=',
                isPageLoading : '=',
                selectedPeriod : '='
            },
            restrict : 'E',
            templateUrl : '../../partials/singleReportTemplate/MR_bMElecssories.html',            
            link : function(scope, element, attrs){                                                                
                var initializePage = function(){
                    scope.isPageLoading = true;
                    scope.isResultShown = false;                    
                    scope.Label = Label;
                    getResult();                    
                }

                var loadRetailerPrice=function(data,category){
                    for(var i=0;i<data.variantInfo.length;i++){
                        if(data.variantInfo[i].parentCategoryID==category){
                            var fullName=data.variantInfo[i].parentBrandName+data.variantInfo[i].variantName;
                            var rural1Value=rural1ValueChange=urban1Value=urban1ValueChange=rural2Value=rural2ValueChange=urban2Value=urban2ValueChange=0;
                            /*
                                urban=latestNetMarketPrice[0]
                                rural=latestNetMarketPrice[1]
                                urbanChange=netMarketPriceChange[0]
                                ruralChange=netMarketPriceChange[1]
                            */
                            if(data.variantInfo[i].accountInfo[0]!=undefined){
                                rural1Value=data.variantInfo[i].accountInfo[0].latestNetMarketPrice[1];
                                rural1ValueChange=data.variantInfo[i].accountInfo[0].netMarketPriceChange[1]*100;
                                urban1Value=data.variantInfo[i].accountInfo[0].latestNetMarketPrice[0];
                                urban1ValueChange=data.variantInfo[i].accountInfo[0].netMarketPriceChange[0]*100;
                            }
                            if(data.variantInfo[i].accountInfo[1]!=undefined){
                                rural2Value=data.variantInfo[i].accountInfo[1].latestNetMarketPrice[1];
                                rural2ValueChange=data.variantInfo[i].accountInfo[1].netMarketPriceChange[1]*100;
                                urban2Value=data.variantInfo[i].accountInfo[1].latestNetMarketPrice[0];
                                urban2ValueChange=data.variantInfo[i].accountInfo[1].netMarketPriceChange[0]*100;
                            }
                            switch(data.variantInfo[i].parentCompanyID){
                                case 1:scope.player1s.push({'fullName':fullName,'rural1Value':rural1Value,'rural1ValueChange':rural1ValueChange,'urban1Value':urban1Value,'urban1ValueChange':urban1ValueChange,'rural2Value':rural2Value,'rural2ValueChange':rural2ValueChange,'urban2Value':urban2Value,'urban2ValueChange':urban2ValueChange});break;
                                case 2:scope.player2s.push({'fullName':fullName,'rural1Value':rural1Value,'rural1ValueChange':rural1ValueChange,'urban1Value':urban1Value,'urban1ValueChange':urban1ValueChange,'rural2Value':rural2Value,'rural2ValueChange':rural2ValueChange,'urban2Value':urban2Value,'urban2ValueChange':urban2ValueChange});break;
                                case 3:scope.player3s.push({'fullName':fullName,'rural1Value':rural1Value,'rural1ValueChange':rural1ValueChange,'urban1Value':urban1Value,'urban1ValueChange':urban1ValueChange,'rural2Value':rural2Value,'rural2ValueChange':rural2ValueChange,'urban2Value':urban2Value,'urban2ValueChange':urban2ValueChange});break;
                                case 5:scope.player5s.push({'fullName':fullName,'rural1Value':rural1Value,'rural1ValueChange':rural1ValueChange,'urban1Value':urban1Value,'urban1ValueChange':urban1ValueChange,'rural2Value':rural2Value,'rural2ValueChange':rural2ValueChange,'urban2Value':urban2Value,'urban2ValueChange':urban2ValueChange});break;
                                case 6:scope.player6s.push({'fullName':fullName,'rural1Value':rural1Value,'rural1ValueChange':rural1ValueChange,'urban1Value':urban1Value,'urban1ValueChange':urban1ValueChange,'rural2Value':rural2Value,'rural2ValueChange':rural2ValueChange,'urban2Value':urban2Value,'urban2ValueChange':urban2ValueChange});break;
                            }
                        }
                    }
                }

                var getResult =function(){
                    var url='/getMR-netMarketPrices/'+SeminarInfo.getSelectedSeminar().seminarCode+'/'+scope.selectedPeriod;
                    $http({
                        method:'GET',
                        url:url,
                        //tracker: scope.loadingTracker
                    }).then(function(data){   
                        return organiseArray(data.data[0]);
                    }).then(function(data){
                        scope.isResultShown = true;
                        scope.isPageLoading = false;                                                                         
                    },function(){
                        console.log('fail');
                    });
                }

                var organiseArray = function(data){
                    var deferred = $q.defer();
                    scope.player1s=new Array();scope.player2s=new Array();scope.player3s=new Array();scope.player5s=new Array();scope.player6s=new Array();
                    scope.nameColor='#DFF0D8';//绿
                    loadRetailerPrice(data,1);
                    deferred.resolve({msg:'Array is ready.'});                    
                    return deferred.promise;
                }


                scope.$watch('isPageShown', function(newValue, oldValue){
                    if(newValue==true) {
                        initializePage();
                    }
                })
                scope.$watch('selectedPeriod', function(newValue, oldValue){
                    if(newValue!=oldValue&&scope.isPageShown) {
                        initializePage();
                    }
                })

            }
        }
    }])
})