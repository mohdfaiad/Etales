define(['directives', 'services'], function(directives) {

    directives.directive('retailerMarketResearchOrders', ['RetailerDecisionBase', 'Label', 'SeminarInfo', '$http', 'PeriodInfo', '$q', 'PlayerInfo','RetailerDecisionBase',
        function(RetailerDecisionBase, Label, SeminarInfo, $http, PeriodInfo, $q, PlayerInfo,RetailerDecisionBase) {
            return {
                scope: {
                    isPageShown: '=',
                    isPageLoading: '=',
                    selectedPeriod: '=',
                    selectedPlayer: '=',
                    isContractDeal: '=',
                    isContractFinalized: '=',
                    isDecisionCommitted: '='
                },
                restrict: 'E',
                templateUrl: '../../partials/singleReportTemplate/RD_marketResearchOrders.html',
                link: function(scope, element, attrs) {
                    var initializePage = function() {
                        scope.isPageLoading = true;
                        scope.isResultShown = false;
                        scope.Label = Label;
                        showView();
                    }

                    var showView = function() {
                        RetailerDecisionBase.reload({
                            retailerID: parseInt(PlayerInfo.getPlayer()),
                            period: scope.selectedPeriod,
                            seminar: SeminarInfo.getSelectedSeminar().seminarCode
                        }).then(function(base) {
                            scope.pageBase = base;
                        }).then(function() {
                            return getResult();
                        }),
                        function(reason) {
                            console.log('from ctr: ' + reason);
                        },
                        function(update) {
                            console.log('from ctr: ' + update);
                        };
                    }

                    var getResult = function() {
                        var reportStatus = {};
                        var prices = {};
                        var url = '/getReportPrice/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + scope.selectedPeriod;
                        $http({
                            method: 'GET',
                            url: url
                        }).then(function(data) {
                            prices = data.data;
                            return organiseArray(reportStatus, prices)
                        }).then(function(data) {
                            scope.isResultShown = true;
                            scope.isPageLoading = false;
                        }, function() {
                            console.log('fail');
                        });
                    }
                    var organiseArray = function(reportStatus, prices) {
                        var deferred = $q.defer();

                        var playDatas = new Array();
                        playDatas.push({
                            'name': 'Awareness',
                            'realName': 'awareness',
                            'reportPrice': prices[0],
                            'playerStatus': scope.pageBase.marketResearchOrder[0]
                        });
                        playDatas.push({
                            'name': 'Brand Perceptions',
                            'realName': 'brandPerceptions',
                            'reportPrice': prices[1],
                            'playerStatus': scope.pageBase.marketResearchOrder[1]
                        });
                        playDatas.push({
                            'name': 'Retailer Perceptions',
                            'realName': 'retailerPerceptions',
                            'reportPrice': prices[2],
                            'playerStatus': scope.pageBase.marketResearchOrder[2]
                        });
                        playDatas.push({
                            'name': 'Market Share By Consumer Segment',
                            'realName': 'marketShareByConsumerSegment',
                            'reportPrice': prices[3],
                            'playerStatus': scope.pageBase.marketResearchOrder[3]
                        });
                        playDatas.push({
                            'name': 'Sales By Consumer Segment',
                            'realName': 'salesByConsumerSegment',
                            'reportPrice': prices[4],
                            'playerStatus': scope.pageBase.marketResearchOrder[4]
                        });
                        playDatas.push({
                            'name': 'Market Share ByShopper Segment',
                            'realName': 'marketShareByShopperSegment',
                            'reportPrice': prices[5],
                            'playerStatus': scope.pageBase.marketResearchOrder[5]
                        });
                        playDatas.push({
                            'name': 'Sales By Shopper Segment',
                            'realName': 'salesByShopperSegment',
                            'reportPrice': prices[6],
                            'playerStatus': scope.pageBase.marketResearchOrder[6]
                        });
                        playDatas.push({
                            'name': 'BM Retailer Prices',
                            'realName': 'BMRetailerPrices',
                            'reportPrice': prices[7],
                            'playerStatus': scope.pageBase.marketResearchOrder[7]
                        });
                        playDatas.push({
                            'name': 'Promotion Intensity',
                            'realName': 'promotionIntensity',
                            'reportPrice': prices[8],
                            'playerStatus': scope.pageBase.marketResearchOrder[8]
                        });
                        playDatas.push({
                            'name': 'Supplier Intelligence',
                            'realName': 'supplierIntelligence',
                            'reportPrice': prices[9],
                            'playerStatus': scope.pageBase.marketResearchOrder[9]
                        });
                        playDatas.push({
                            'name': 'Retailer Intelligence',
                            'realName': 'retailerIntelligence',
                            'reportPrice': prices[10],
                            'playerStatus': scope.pageBase.marketResearchOrder[10]
                        });
                        playDatas.push({
                            'name': 'Forecasts',
                            'realName': 'forecasts',
                            'reportPrice': prices[11],
                            'playerStatus': scope.pageBase.marketResearchOrder[11]
                        });
                        playDatas.push({
                            'name': 'Sales By Channel',
                            'realName': 'salesByChannel',
                            'reportPrice': prices[12],
                            'playerStatus': scope.pageBase.marketResearchOrder[12]
                        });
                        scope.playDatas = playDatas;

                        deferred.resolve({
                            msg: 'Array is ready.'
                        });
                        return deferred.promise;
                    }

                    scope.checkBudget = function(price, value) {
                        var d = $q.defer();
                        var abMax = 0,
                            expend = 0,
                            reportExpend = 0;
                        if (value) {
                            var url = "/companyHistoryInfo/" + SeminarInfo.getSelectedSeminar().seminarCode + '/' + (scope.selectedPeriod - 1) + '/R/' + parseInt(scope.selectedPlayer);
                            $http({
                                method: 'GET',
                                url: url
                            }).then(function(data) {
                                abMax = data.data.budgetAvailable;
                                url = "/retailerExpend/" + SeminarInfo.getSelectedSeminar().seminarCode + '/' + (scope.selectedPeriod) + '/' + parseInt(scope.selectedPlayer) + '/-1/location/1';
                                return $http({
                                    method: 'GET',
                                    url: url
                                });
                            }).then(function(data) {
                                expend = data.data.result;
                                url = '/getPlayerReportOrderExpend/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + scope.selectedPeriod + '/R/' + scope.selectedPlayer;
                                return $http({
                                    method: 'GET',
                                    url: url
                                });
                            }).then(function(data) {
                                reportExpend = data.data.result;

                                url = '/getRetailerAdditionalBudget/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + scope.selectedPeriod + '/' + PlayerInfo.getPlayer();
                                return $http({
                                    method: 'GET',
                                    url: url
                                });
                            }).then(function(data) {
                                additionalBudget = data.data;

                                if (abMax + additionalBudget - expend - reportExpend < price) {
                                    d.resolve(Label.getContent('Not enough budget'));
                                } else {
                                    d.resolve();
                                }
                            }, function(data) {
                                console.log('fail');
                            });
                        } else {
                            d.resolve();
                        }
                        return d.promise;
                    }


                    scope.submitOrder = function(additionalIdx, value) {
                        RetailerDecisionBase.setMarketResearchOrders(scope.selectedPlayer, additionalIdx, value,'retailerMarketResearchOrders');

                    }


                    scope.$watch('isPageShown', function(newValue, oldValue) {
                        if (newValue == true) {
                            initializePage();
                        }
                    })
                    scope.$on('producerDecisionBaseChangedFromServer', function(event, data, newBase) {                    
                        //decision base had been updated, re-render the page with newBase
                        if(data.page=="retailerMarketResearchOrders"){
                            scope.pageBase = newBase;
                            showView();
                        }
                    });

                }
            }
        }
    ])
})