define(['directives', 'services'], function(directives) {

    directives.directive('generalChannelPerspective', ['Label', 'SeminarInfo', '$http', 'PeriodInfo', '$q',
        function(Label, SeminarInfo, $http, PeriodInfo, $q) {
            return {
                scope: {
                    isPageShown: '=',
                    isPageLoading: '=',
                    selectedPeriod: '='
                },
                restrict: 'E',
                templateUrl: '../../partials/singleReportTemplate/GR_channelPerspective.html',
                link: function(scope, element, attrs) {
                    var initializePage = function() {
                        scope.isPageLoading = true;
                        scope.isResultShown = false;
                        scope.Label         = Label;
                        getResult();
                    }

                    var getResult = function() {

                        //switching('showPerformance');
                        var url = '/performanceHighlights/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + scope.selectedPeriod;

                        $http({
                            method: 'GET',
                            url: url,
                            //tracker: scope.loadingTracker
                        }).then(function(data) {
                            return organiseArray(data);
                        }).then(function(data) {                                          

                            scope.isResultShown = true;
                            scope.isPageLoading = false;

                        }, function(data) {
                            // if(!scope.logs){scope.logs = [];}
                            // scope.logs.push(data.msg);                                            
                        });
                    }

                    var organiseArray = function(data) {
                        var deferred = $q.defer();

                        //if(data.data[0] == "XXXXX"){ deferred.reject({msg:'XXXXX'}); }
                        if (data.data[0]) {
                            scope.operatingProfits      = new Array();
                            scope.cumulativeInvestments = new Array();
                            scope.salesVolumes          = new Array();
                            scope.salesValues           = new Array();
                            scope.volumeShares          = new Array();
                            scope.valueShares           = new Array();
                            for (var i = 0; i < data.data[0].actorInfo.length; i++) {
                                scope.operatingProfits.push({
                                    'value': data.data[0].actorInfo[i].grph_OperatingProfit
                                });
                                scope.cumulativeInvestments.push({
                                    'value': data.data[0].actorInfo[i].grph_CumulativeInvestment
                                });
                                for (j = 0; j < data.data[0].actorInfo[i].actorCategoryInfo.length - 1; j++) {
                                    scope.salesVolumes.push({
                                        'value': data.data[0].actorInfo[i].actorCategoryInfo[j].grph_SalesVolume
                                    });
                                    scope.salesValues.push({
                                        'value': data.data[0].actorInfo[i].actorCategoryInfo[j].grph_NetSalesValue
                                    });
                                    scope.valueShares.push({
                                        'value': data.data[0].actorInfo[i].actorCategoryInfo[j].grph_ValueMarketShare
                                    });
                                    scope.volumeShares.push({
                                        'value': data.data[0].actorInfo[i].actorCategoryInfo[j].grph_VolumeMarketShare
                                    });
                                }
                            }

                            deferred.resolve({
                                msg: 'Array is ready.'
                            });
                        } else {
                            deferred.reject({
                                msg: 'data.data[0] is undefined'
                            });
                        }
                        return deferred.promise;
                    }

                    scope.$watch('isPageShown', function(newValue, oldValue) {
                        console.log('watch is actived');
                        if (newValue == true) {
                            initializePage();
                        }
                    })
                    scope.$watch('selectedPeriod', function(newValue, oldValue) {
                        if (newValue != oldValue && scope.isPageShown) {
                            initializePage();
                        }
                    })
                }
            }
        }
    ])
})