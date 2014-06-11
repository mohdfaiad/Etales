define(['directives', 'services'], function(directives){

    directives.directive('marketRuralHealthBeautiesShopperShare', ['Label','SeminarInfo','$http','PeriodInfo','$q', function(Label, SeminarInfo, $http, PeriodInfo, $q){
        return {
            scope : {
                isPageShown : '=',
                isPageLoading : '='
            },
            restrict : 'E',
            templateUrl : '../../partials/singleReportTemplate/MR_ruralHealthBeautiesShopperShare.html',                        
            link : function(scope, element, attrs){                                                                
                var initializePage = function(){
                    scope.isPageLoading = true;
                    scope.isResultShown = false;                    
                    scope.Label = Label;
                    getResult();                    
                }

                var loadMarketShopper=function(data,category,market){
                    for(var i=0;i<data.data[0].absoluteValue.length;i++){
                        if(data.data[0].absoluteValue[i].parentCategoryID==category&&data.data[0].absoluteValue[i].marketID==market){
                            var variantName=data.data[0].absoluteValue[i].variantName;
                            var brandName=data.data[0].absoluteValue[i].parentBrandName;
                            var bmValue=(data.data[0].absoluteValue[i].segmentInfo[4].shopperInfo[0].value*100).toFixed(2);
                            var onlineValue=(data.data[0].absoluteValue[i].segmentInfo[4].shopperInfo[1].value*100).toFixed(2);
                            var mixedValue=(data.data[0].absoluteValue[i].segmentInfo[4].shopperInfo[2].value*100).toFixed(2);
                            var Changes=_.find(data.data[0].valueChange,function(obj){
                                return (obj.parentBrandName==brandName&&obj.variantName==variantName&&obj.marketID==market);
                            });
                            if(Changes!=undefined){
                                var bmValueChange=(Changes.segmentInfo[4].shopperInfo[0].value*100).toFixed(2);
                                var onlineValueChange=(Changes.segmentInfo[4].shopperInfo[1].value*100).toFixed(2);
                                var mixedValueChange=(Changes.segmentInfo[4].shopperInfo[2].value*100).toFixed(2); 
                            }else{
                                var bmValueChange=0;
                                var onlineValueChange=0;
                                var mixedValueChange=0; 
                            }

                            var Volumes=_.find(data.data[0].absoluteVolume,function(obj){
                                return (obj.parentBrandName==brandName&&obj.variantName==variantName&&obj.marketID==market);
                            });
                            var VolumeChanges=_.find(data.data[0].volumeChange,function(obj){
                                return (obj.parentBrandName==brandName&&obj.variantName==variantName&&obj.marketID==market);
                            });
                            if(Volumes!=undefined){
                                var bmVolume=(Volumes.segmentInfo[4].shopperInfo[0].value*100).toFixed(2);
                                var onlineVolume=(Volumes.segmentInfo[4].shopperInfo[1].value*100).toFixed(2);
                                var mixedVolume=(Volumes.segmentInfo[4].shopperInfo[2].value*100).toFixed(2);
                            }else{
                                var bmVolume=0;
                                var onlineVolume=0;
                                var mixedVolume=0;
                            }
                            if(VolumeChanges!=undefined){
                                var bmVolumeChange=(VolumeChanges.segmentInfo[4].shopperInfo[0].value*100).toFixed(2);
                                var onlineVolumeChange=(VolumeChanges.segmentInfo[4].shopperInfo[1].value*100).toFixed(2);
                                var mixedVolumeChange=(VolumeChanges.segmentInfo[4].shopperInfo[2].value*100).toFixed(2);                                
                            }else{
                                var bmVolumeChange=0;
                                var onlineVolumeChange=0;
                                var mixedVolumeChange=0;
                            }
                            switch(data.data[0].absoluteValue[i].parentCompanyID){
                                case 1:scope.player1s.push({'fullName':brandName+variantName,'bmValue':bmValue,'bmValueChange':bmValueChange,'bmVolume':bmVolume,'bmVolumeChange':bmVolumeChange,'onlineValue':onlineValue,'onlineValueChange':onlineValueChange,'onlineVolume':onlineVolume,'onlineVolumeChange':onlineVolumeChange,'mixedValue':mixedValue,'mixedValueChange':mixedValueChange,'mixedVolume':mixedVolume,'mixedVolumeChange':mixedVolumeChange});break;
                                case 2:scope.player2s.push({'fullName':brandName+variantName,'bmValue':bmValue,'bmValueChange':bmValueChange,'bmVolume':bmVolume,'bmVolumeChange':bmVolumeChange,'onlineValue':onlineValue,'onlineValueChange':onlineValueChange,'onlineVolume':onlineVolume,'onlineVolumeChange':onlineVolumeChange,'mixedValue':mixedValue,'mixedValueChange':mixedValueChange,'mixedVolume':mixedVolume,'mixedVolumeChange':mixedVolumeChange});break;
                                case 3:scope.player3s.push({'fullName':brandName+variantName,'bmValue':bmValue,'bmValueChange':bmValueChange,'bmVolume':bmVolume,'bmVolumeChange':bmVolumeChange,'onlineValue':onlineValue,'onlineValueChange':onlineValueChange,'onlineVolume':onlineVolume,'onlineVolumeChange':onlineVolumeChange,'mixedValue':mixedValue,'mixedValueChange':mixedValueChange,'mixedVolume':mixedVolume,'mixedVolumeChange':mixedVolumeChange});break;
                                case 5:scope.player5s.push({'fullName':brandName+variantName,'bmValue':bmValue,'bmValueChange':bmValueChange,'bmVolume':bmVolume,'bmVolumeChange':bmVolumeChange,'onlineValue':onlineValue,'onlineValueChange':onlineValueChange,'onlineVolume':onlineVolume,'onlineVolumeChange':onlineVolumeChange,'mixedValue':mixedValue,'mixedValueChange':mixedValueChange,'mixedVolume':mixedVolume,'mixedVolumeChange':mixedVolumeChange});break;
                                case 6:scope.player6s.push({'fullName':brandName+variantName,'bmValue':bmValue,'bmValueChange':bmValueChange,'bmVolume':bmVolume,'bmVolumeChange':bmVolumeChange,'onlineValue':onlineValue,'onlineValueChange':onlineValueChange,'onlineVolume':onlineVolume,'onlineVolumeChange':onlineVolumeChange,'mixedValue':mixedValue,'mixedValueChange':mixedValueChange,'mixedVolume':mixedVolume,'mixedVolumeChange':mixedVolumeChange});break;
                            }
                        }
                    }
                }

                var getResult =function(){
                    var url='/getMR-sharesCrossSegment/'+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1);
                    $http({
                        method:'GET',
                        url:url,
                        //tracker: scope.loadingTracker
                    }).then(function(data){   
                        return organiseArray(data);
                    }).then(function(data){
                        scope.isResultShown = true;
                        scope.isPageLoading = false;                                                                         
                    },function(){
                        console.log('fail');
                    });
                }

                var organiseArray = function(data){
                    var deferred = $q.defer();
                    scope.shopperShare=true;
                    scope.player1s=new Array();scope.player2s=new Array();scope.player3s=new Array();scope.player5s=new Array();scope.player6s=new Array();
                    loadMarketShopper(data,2,2);
                    scope.nameColor='#F2DEDE'//红
                    scope.valueColor='#D9EDF7';//蓝
                    deferred.resolve({msg:'Array is ready.'});                    
                    return deferred.promise;
                }


                scope.$watch('isPageShown', function(newValue, oldValue){
                    if(newValue==true) {
                        initializePage();
                    }
                })

            }
        }
    }])
})