define(['app', 'socketIO', 'routingConfig'], function(app) {
	app.controller('generalReportCtrl', ['$scope', '$http', 'ProducerDecisionBase', '$rootScope', 'Auth', '$anchorScroll', '$q', 'PlayerInfo', 'SeminarInfo', 'PeriodInfo', 'Label', 'RoleInfo',
		function($scope, $http, ProducerDecisionBase, $rootScope, Auth, $anchorScroll, $q, PlayerInfo, SeminarInfo, PeriodInfo, Label, RoleInfo) {

			$scope.$watch('isPageLoading', function(newValue, oldValue) {
				$scope.isPageLoading = newValue;
			})

			var switching = function(type) {
				$scope.BrandPerspective = $scope.ChannelPerspective = $scope.MarketShare = $scope.MarketSales = $scope.EleSegment = $scope.HeaSegment = $scope.Cross = $scope.Product = $scope.EMallPrices = $scope.ProducerConsolidate = $scope.ProducerBMBusiness = $scope.ProducerOnlineBusiness = $scope.ProducerProfitability = $scope.ProducerNegotiations = $scope.ElecssoriesConsumer = $scope.ElecssoriesShopper = $scope.ElecssoriesVolume = $scope.HealthBeautiesConsumer = $scope.HealthBeautiesShopper = $scope.HealthBeautiesVolume = $scope.ProducerKey = $scope.RuralConsumer = $scope.RuralShopper = $scope.RuralVolume = $scope.UrbanConsumer = $scope.UrbanShopper = $scope.UrbanVolume = $scope.RetailerKey = $scope.RetailerConsolidate = $scope.RetailerRuralProfit = $scope.RetailerUrbanProfit = $scope.RetailerProfitability = $scope.RetailerNegotiations = false;
				$scope.AwarenessElecssories = $scope.AwarenessHealthBeauties = $scope.RuralElecssoriesBrand = $scope.UrbanElecssoriesBrand = $scope.RuralHealthBeautiesBrand = $scope.UrbanHealthBeautiesBrand = $scope.RetailerPerceptions = $scope.RuralElecssoriesConsumerShare = $scope.UrbanElecssoriesConsumerShare = $scope.RuralHealthBeautiesConsumerShare = $scope.UrbanHealthBeautiesConsumerShare = $scope.RuralElecssoriesConsumerSales = $scope.UrbanElecssoriesConsumerSales = $scope.RuralHealthBeautiesConsumerSales = $scope.UrbanHealthBeautiesConsumerSales = $scope.RuralElecssoriesShopperShare = $scope.UrbanElecssoriesShopperShare = $scope.RuralHealthBeautiesShopperShare = $scope.UrbanHealthBeautiesShopperShare = $scope.RuralElecssoriesShopperSales = $scope.UrbanElecssoriesShopperSales = $scope.RuralHealthBeautiesShopperSales = $scope.UrbanHealthBeautiesShopperSales = $scope.BMElecssories = $scope.BMHealthBeauties = $scope.PromotionElecssories = $scope.PromotionHealthBeauties = $scope.SupplierIntelligence = $scope.RetailerIntelligence = $scope.ForecastsConsumer = $scope.ForecastsShopper = $scope.ForecastsCategory = $scope.ForecastsInternet = false;
				switch (type) {
					case 'showBrandPerspective':
						$scope.BrandPerspective = true;
						break;
					case 'showChannelPerspective':
						$scope.ChannelPerspective = true;
						break;
					case 'showMarketShare':
						$scope.MarketShare = true;
						break;
					case 'showMarketSales':
						$scope.MarketSales = true;
						break;
					case 'showEleSegment':
						$scope.EleSegment = true;
						break;
					case 'showHeaSegment':
						$scope.HeaSegment = true;
						break;
					case 'showCross':
						$scope.Cross = true;
						break;
					case 'showProduct':
						$scope.Product = true;
						break;
					case 'showEMallPrices':
						$scope.EMallPrices = true;
						break;
				}
			}

			$scope.selectedPeriod = PeriodInfo.getCurrentPeriod() - 1;
			$scope.nextBtn = false;
			$scope.previousBtn = true;
			
			$scope.changePeriod = function(type) {
				if (type == "add") {
					$scope.selectedPeriod = $scope.selectedPeriod + 1;
				} else {
					$scope.selectedPeriod = $scope.selectedPeriod - 1;
				}
				if ($scope.selectedPeriod < PeriodInfo.getCurrentPeriod() - 1) {
					$scope.nextBtn = true;
				} else {
					$scope.nextBtn = false;
				}
				if ($scope.selectedPeriod > -3) {
					$scope.previousBtn = true;
				} else {
					$scope.previousBtn = false;
				}
			}

			var showBrandPerspective = function() {
				switching('showBrandPerspective');
			}
			$scope.showChannelPerspective = function() {
				switching('showChannelPerspective');
			}

			$scope.showMarketShare = function() {
				switching('showMarketShare');
			}

			$scope.showMarketSales = function() {
				switching('showMarketSales');
			}

			$scope.showEleSegment = function() {
				switching('showEleSegment');
			}

			$scope.showHeaSegment = function() {
				switching('showHeaSegment');
			}

			$scope.showCross = function() {
				switching('showCross');
			}

			$scope.showProduct = function() {
				switching('showProduct');
			}

			$scope.showEMallPrices = function() {
				switching('showEMallPrices');
			}
			
			$scope.$on('SeminarPeriodChanged', function(event, data) {
				if (data.seminarCode == SeminarInfo.getSelectedSeminar().seminarCode) {
					$scope.currentPeriod = data.currentPeriod;
					$scope.span = data.simulationSpan;
					$scope.seminar = data.seminarCode;
					if ($scope.selectedPeriod < PeriodInfo.getCurrentPeriod() - 1) {
						$scope.nextBtn = true;
					} else {
						$scope.nextBtn = false;
					}
					if ($scope.selectedPeriod > -3) {
						$scope.previousBtn = true;
					} else {
						$scope.previousBtn = false;
					}
				}
			});



			$scope.switching = switching;
			$scope.showBrandPerspective = showBrandPerspective;
			showBrandPerspective();

			$scope.currentPeriod = PeriodInfo.getCurrentPeriod();
			$scope.historyPeriod = PeriodInfo.getCurrentPeriod() - 1;
		}
	]);

});