define(['app', 'socketIO', 'routingConfig'], function(app) {
    app.controller('retailerDecisionCtrl', ['$scope', '$http', 'RetailerDecisionBase', '$rootScope', 'Auth', '$anchorScroll', '$q', 'PlayerInfo', 'SeminarInfo', 'PeriodInfo', 'Label', 'RoleInfo', 'notify', '$timeout', '$location',

        function($scope, $http, RetailerDecisionBase, $rootScope, Auth, $anchorScroll, $q, PlayerInfo, SeminarInfo, PeriodInfo, Label, RoleInfo, notify, $timeout, $location) {

            $scope.$watch('isPageLoading', function(newValue, oldValue) {
                $scope.isPageLoading = newValue;
            })

            var switching = function(type) {
                $scope.isNegotiationChange = $scope.NegotiationAgreements = $scope.Marketing = $scope.PrivateLabelPortfolioManagement = $scope.StoreManagement = $scope.MarketResearchOrders = $scope.isNegotiation = false;
                switch (type) {
                    case 'showNegotiationAgreements':
                        $scope.NegotiationAgreements = true;
                        $scope.isNegotiation = true;
                        break;
                    case 'showMarketing':
                        $scope.Marketing = true;
                        break;
                    case 'showPrivateLabelPortfolioManagement':
                        $scope.PrivateLabelPortfolioManagement = true;
                        break;
                    case 'showStoreManagement':
                        $scope.StoreManagement = true;
                        break;
                    case 'showMarketResearchOrders':
                        $scope.MarketResearchOrders = true;
                        break;
                }
            }

            var loadBackgroundDataAndCalculateDecisionInfo = function() {
                var abMax = 0,
                    expend = 0,
                    reportExpend = 0;
                if(PeriodInfo.getDecisionPeriod()&&PlayerInfo.getPlayer()){
                    var url = "/companyHistoryInfo/" + SeminarInfo.getSelectedSeminar().seminarCode + '/' + (PeriodInfo.getDecisionPeriod() - 1) + '/R/' + parseInt(PlayerInfo.getPlayer());
                    $http({
                        method: 'GET',
                        url: url
                    }).then(function(data) {
                        $scope.previousBudgetIncreaseDueToNegotiation = (Math.floor(data.data.budgetIncreaseFromNegotiations * 100) / 100);
                        $scope.budgetExtensions = (Math.floor(data.data.budgetExtensions* 100) / 100);
                        $scope.budgetSpentToDate = (Math.floor(data.data.budgetSpentToDate* 100) / 100);
                        $scope.initialBudget = (Math.floor(data.data.initialBudget* 100) / 100);
                        $scope.abMax = (Math.floor(data.data.budgetAvailable* 100) / 100);
                        
                        url = "/retailerExpend/" + SeminarInfo.getSelectedSeminar().seminarCode + '/' + (PeriodInfo.getDecisionPeriod()) + '/' + parseInt(PlayerInfo.getPlayer()) + '/-1/location/1';
                        return $http({
                            method: 'GET',
                            url: url
                        });
                    }).then(function(data) {
                        expend = (Math.floor(data.data.result * 100) / 100);

                        url = '/getPlayerReportOrderExpend/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + PeriodInfo.getDecisionPeriod() + '/R/' + PlayerInfo.getPlayer();
                        return $http({
                            method: 'GET',
                            url: url
                        });
                    }).then(function(data) {
                        reportExpend = (Math.floor(data.data.result * 100) / 100);


                        url = '/getRetailerAdditionalBudget/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + PeriodInfo.getDecisionPeriod() + '/' + PlayerInfo.getPlayer();
                        return $http({
                            method: 'GET',
                            url: url
                        });
                    }).then(function(data) {
                        $scope.budgetIncreaseDueToNegotiation = (Math.floor(data.data.result * 100) / 100);                                    
                        $scope.estimatedSpending = (Math.floor((expend + reportExpend) * 100) / 100);
                        $scope.surplusExpend = (Math.floor(($scope.abMax + $scope.budgetIncreaseDueToNegotiation - expend - reportExpend) * 100) / 100);

                        //$scope.percentageExpend=($scope.abMax-expend)/$scope.abMax*100;
                        url = "/retailerShelfSpace/" + SeminarInfo.getSelectedSeminar().seminarCode + '/' + (PeriodInfo.getDecisionPeriod()) + '/' + parseInt(PlayerInfo.getPlayer()) + '/-1/0/brandName/varName';
                        return $http({
                            method: 'GET',
                            url: url
                        });
                    }).then(function(data) {
                        $scope.surplusShelf = new Array();
                        $scope.percentageShelf = new Array();
                        $scope.surplusShelf[0] = new Array();
                        $scope.surplusShelf[1] = new Array();
                        $scope.percentageShelf[0] = new Array();
                        $scope.percentageShelf[1] = new Array();
                        $scope.surplusShelf[0][0] = (Math.floor(10000*data.data.result[0][0])/10000);
                        $scope.surplusShelf[0][1] = (Math.floor(10000*data.data.result[0][1])/10000);
                        $scope.surplusShelf[1][0] = (Math.floor(10000*data.data.result[1][0])/10000);
                        $scope.surplusShelf[1][1] = (Math.floor(10000*data.data.result[1][1])/10000);
                        $scope.percentageShelf[0][0] = (Math.floor(((1 - $scope.surplusShelf[0][0]) * 100)*100)/100);
                        $scope.percentageShelf[0][1] = (Math.floor(((1 - $scope.surplusShelf[0][1]) * 100)*100)/100);
                        $scope.percentageShelf[1][0] = (Math.floor(((1 - $scope.surplusShelf[1][0]) * 100)*100)/100);
                        $scope.percentageShelf[1][1] = (Math.floor(((1 - $scope.surplusShelf[1][1]) * 100)*100)/100);
                        url = '/checkRetailerDecisionStatus/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + PeriodInfo.getDecisionPeriod() + '/' + parseInt(PlayerInfo.getPlayer());
                        return $http({
                            method: 'GET',
                            url: url
                        });
                    }).then(function(data) {
                        $scope.isContractDeal=data.data.isContractDeal;
                        $scope.isContractFinalized=data.data.isContractFinalized;
                        $scope.isDecisionCommitted=data.data.isDecisionCommitted;
                        return $http({
                            method:'GET',
                            url:'/getTimerActiveInfo/'+SeminarInfo.getSelectedSeminar().seminarCode
                        })
                    }).then(function(data){
                        $scope.isTimerActived=data.data.result;
                    }, function() {
                        console.log('fail');
                    });
                }else{
                    $location.path('/facilitatorDecision');
                }
            }

            var showNegotiationAgreements = function() {
                switching('showNegotiationAgreements');
            }

            $scope.showMarketing = function() {
                switching('showMarketing');
            }

            $scope.showPrivateLabelPortfolioManagement = function() {
                switching('showPrivateLabelPortfolioManagement');
            }

            $scope.showStoreManagement = function() {
                switching('showStoreManagement');
            }

            $scope.showMarketResearchOrders = function() {
                switching('showMarketResearchOrders');
            }

            $scope.switching = switching;
            $scope.showNegotiationAgreements = showNegotiationAgreements;
            $scope.loadBackgroundDataAndCalculateDecisionInfo = loadBackgroundDataAndCalculateDecisionInfo;


            loadBackgroundDataAndCalculateDecisionInfo();
            showNegotiationAgreements();

            //handle Retailer Decision module push notification messages
            $scope.$on('reloadRetailerBudgetMonitor', function(event) {
                loadBackgroundDataAndCalculateDecisionInfo();
            });

            $scope.$on('retailerDecisionBaseChangedFromServer', function(event, data, newBase) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Decision has been saved, Retailer ' + data.retailerID + ' Period ' + data.period +' page '+data.page +'.');
            });

            $scope.$on('retailerDecisionReloadError', function(event, data, newBase) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Decision reload Error occur, Retailer ' + data.retailerID + ' Period ' + data.period +' page '+data.page +'.');
            });

            $scope.$on('retailerMarketResearchOrdersChanged', function(event, data) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Decision has been saved, Retailer ' + data.retailerID + ' Period ' + data.period +' page '+data.page +'.');
            });

            $scope.$on('retailerContractDeal', function(event, data) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Time is up, Contract Deal. retailer ' + data.roleID + ' Period ' + data.period + '.');
            });

            $scope.$on('retailerContractFinalized', function(event, data) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Time is up, ContractFinalized. retailer ' + data.roleID + ' Period ' + data.period + '.');

            });

            $scope.$on('retailerDecisionLocked', function(event, data) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Time is up, Lock Decision. Retailer ' + data.roleID + ' Period ' + data.period + '.');
            });
            
            $scope.$on('finalizeContract', function(event, data) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Time is up, Lock Contract. ' + ' Period ' + data.period + '.');
            });

            $scope.$on('committeDecision', function(event, data) {
                loadBackgroundDataAndCalculateDecisionInfo();
                notify('Time is up, Lock Decision.' + ' Period ' + data.period + '.');
            });

            var drawChart=function(data){
                $scope.chartInit=true;
                $timeout(function() {
                    if(parseInt(data.portfolio)+parseInt(data.contractDeal)>0){
                        $scope.retailerClockTitle=Label.getContent('Contract Deal')+' '+Label.getContent('Left Time')+':'+(parseInt(data.portfolio)+parseInt(data.contractDeal))+'mins';
                    }else if(data.contractFinalized>0){
                        $scope.retailerClockTitle=Label.getContent('Contract Finalize')+' '+Label.getContent('Left Time')+':'+data.contractFinalized+'mins';
                    }else if(data.contractDecisionCommitted>0){
                        $scope.retailerClockTitle=Label.getContent('Decision Committe')+' '+Label.getContent('Left Time')+':'+data.contractDecisionCommitted+'mins';
                    }else{
                        $scope.retailerClockTitle=Label.getContent('Time up');
                    }
                    $scope.retailerChartSeries = [{
                        name: Label.getContent('Total Time'),
                        data: [{
                            'name': Label.getContent('Gone'),
                            'y': data.pass
                        },{
                            'name': Label.getContent('Contract Deal'),
                            'y': parseInt(data.portfolio)+parseInt(data.contractDeal),
                        }, {
                            'name': Label.getContent('Contract Finalize'),
                            'y': data.contractFinalized,
                        },{
                            'name':Label.getContent('Decision Committe'),
                            'y': data.contractDecisionCommitted
                        }]
                    }]
                    $scope.retailerModel=data;
                });
            }
            // $scope.$on('timerWork', function(event, data) {
            //     drawChart(data);
            // });
            // $scope.$on('deadlinePortfolio', function(event, data) {
            //     drawChart(data);
            // });
            // $scope.$on('deadlineContractDeal', function(event, data) {
            //     drawChart(data);
            // });
            // $scope.$on('deadlineContractFinalized', function(event, data) {
            //     drawChart(data);
            // });
            // $scope.$on('deadlineDecisionCommitted', function(event, data) {
            //     drawChart(data);
            // });

            // $scope.$on('timerChanged', function(event, data) {
            //     $scope.isTimerActived=data.isTimerActived;
            // });


            $scope.selectedPlayer = PlayerInfo.getPlayer();
            $scope.selectedPeriod = PeriodInfo.getDecisionPeriod();
        }
    ]);

});