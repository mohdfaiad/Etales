define(['directives', 'services'], function(directives){

    directives.directive('retailerRuralShopper', ['Label','SeminarInfo','$http','PeriodInfo','$q','PlayerInfo', function(Label, SeminarInfo, $http, PeriodInfo, $q,PlayerInfo){
        return {
            scope : {
                isPageShown : '=',
                isPageLoading : '='
            },
            restrict : 'E',
            templateUrl : '../../partials/singleReportTemplate/RCR_retailerRuralShopper.html',            
            link : function(scope, element, attrs){                   
                                             
                var initializePage = function(){
                    console.log('initializePage some small...');                    
                    scope.isPageLoading = true;
                    scope.isResultShown = false;                    
                    scope.Label = Label;
                    getResult();                    
                }

                var loadRetailerShooper=function(data,category,market){
                    for(var i=0;i<data.data[0].absoluteValue.length;i++){
                        if(data.data[0].absoluteValue[i].parentCategoryID==category&&data.data[0].absoluteValue[i].marketID==market){
                            var varName=data.data[0].absoluteValue[i].variantName;
                            var brandName=data.data[0].absoluteValue[i].parentBrandName;
                            var bmValueShare=data.data[0].absoluteValue[i].segmentInfo[4].shopperInfo[0].value;
                            var onlineValueShare=data.data[0].absoluteValue[i].segmentInfo[4].shopperInfo[1].value;
                            var mixedValueShare=data.data[0].absoluteValue[i].segmentInfo[4].shopperInfo[2].value;
                            var valueChanges=_.find(data.data[0].valueChange,function(obj){
                                return(obj.variantName==varName&&obj.parentBrandName==brandName&&obj.marketID==market);
                            });
                            var bmValueChange=valueChanges.segmentInfo[4].shopperInfo[0].value;
                            var onlineValueChange=valueChanges.segmentInfo[4].shopperInfo[1].value;
                            var mixedValueChange=valueChanges.segmentInfo[4].shopperInfo[2].value;
                            var Volumes=_.find(data.data[0].absoluteVolume,function(obj){
                                return(obj.variantName==varName&&obj.parentBrandName==brandName);
                            });
                            var volumeChanges=_.find(data.data[0].volumeChange,function(obj){
                                return(obj.variantName==varName&&obj.parentBrandName==brandName);
                            });
                            var bmVolumeShare=Volumes.segmentInfo[4].shopperInfo[0].value;
                            var onlineVolumeShare=Volumes.segmentInfo[4].shopperInfo[1].value;
                            var mixedVolumeShare=Volumes.segmentInfo[4].shopperInfo[2].value;
                            var bmVolumeChange=volumeChanges.segmentInfo[4].shopperInfo[0].value;
                            var onlineVolumeChange=volumeChanges.segmentInfo[4].shopperInfo[1].value;
                            var mixedVolumeChange=volumeChanges.segmentInfo[4].shopperInfo[2].value;
                            switch(data.data[0].absoluteValue[i].parentCompanyID){
                                case 1:if(category==1){
                                    scope.eleValue1s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.eleVolume1s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }else{
                                    scope.heaValue1s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.heaVolume1s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }break;
                                case 2:if(category==1){
                                    scope.eleValue2s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.eleVolume2s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }else{
                                    scope.heaValue2s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.heaVolume2s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }break;
                                case 3:if(category==1){
                                    scope.eleValue3s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.eleVolume3s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }else{
                                    scope.heaValue3s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.heaVolume3s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }break;
                                case 4:break;
                                case 5:
                                case 6:if(category==1){
                                    scope.eleValue4s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.eleVolume4s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }else{
                                    scope.heaValue4s.push({'fullName':brandName+varName,'bmValueShare':bmValueShare,'bmValueChange':bmValueChange,'onlineValueShare':onlineValueShare,'onlineValueChange':onlineValueChange,'mixedValueShare':mixedValueShare,'mixedValueChange':mixedValueChange});
                                    scope.heaVolume4s.push({'fullName':brandName+varName,'bmVolumeShare':bmVolumeShare,'bmVolumeChange':bmVolumeChange,'onlineVolumeShare':onlineVolumeShare,'onlineVolumeChange':onlineVolumeChange,'mixedVolumeShare':mixedVolumeShare,'mixedVolumeChange':mixedVolumeChange});
                                }break;
                            }
                        }
                    }
                }

                var getResult =function(){
                    scope.eleValue1s=new Array();scope.heaValue1s=new Array();scope.eleValue2s=new Array();scope.heaValue2s=new Array();scope.eleValue3s=new Array();scope.heaValue3s=new Array();scope.eleValue4s=new Array();scope.heaValue4s=new Array();scope.eleVolume1s=new Array();scope.heaVolume1s=new Array();scope.eleVolume2s=new Array();scope.heaVolume2s=new Array();scope.eleVolume3s=new Array();scope.heaVolume3s=new Array();scope.eleVolume4s=new Array();scope.heaVolume4s=new Array();
                    var url='/RCR-sharesCrossSegment/'+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/'+parseInt(PlayerInfo.getPlayer());
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
                    loadRetailerShooper(data,1,2);
                    loadRetailerShooper(data,2,2);
                
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