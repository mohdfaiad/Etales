define(['directives', 'services'], function(directives) {

	directives.directive('overviewShareOfShoppers', ['Label', 'SeminarInfo', '$http', 'PeriodInfo', '$q', 'PlayerColor',
		function(Label, SeminarInfo, $http, PeriodInfo, $q, PlayerColor) {
			return {
				scope: {
					isPageShown: '=',
					isPageLoading: '=',
					feedBack: '=',
					selectedPeriod: '='
				},
				restrict: 'E',
				templateUrl: '../../partials/singleReportTemplate/OR_shareOfShoppers.html',
				link: function(scope, element, attrs) {
					var initializePage = function() {
						console.log('initializePage OR_shareOfShoppers small...');
						scope.isPageLoading = true;
						scope.isResultShown = false;
						scope.Label = Label;
						//if(scope.feedBack!=undefined&&scope.profitReady)
						getResult();
					}

					function newChartData(searchKeys) {
						var chartSeries = new Array({
							name: Label.getContent('Retailer') + '-1',
							data: [],
							color: PlayerColor.r1
						}, {
							name: Label.getContent('Retailer') + '-2',
							data: [],
							color: PlayerColor.r2
						}, {
							name: Label.getContent('Traditional Trade'),
							data: [],
							color: PlayerColor.r3
						}, {
							name: Label.getContent('Supplier') + '-1',
							data: [],
							color: PlayerColor.s1
						}, {
							name: Label.getContent('Supplier') + '-2',
							data: [],
							color: PlayerColor.s2
						}, {
							name: Label.getContent('Supplier') + '-3',
							data: [],
							color: PlayerColor.s3
						}, {
							name: Label.getContent('Supplier') + '-4',
							data: [],
							color: PlayerColor.s4
						});

						return {
							searchKeys: {
								shopperKind: searchKeys.shopperKind,
								marketID: searchKeys.marketID,
								categoryID: searchKeys.categoryID
							},
							chartSeries: chartSeries
						}
					}

					var getResult = function() {
						var currentCategories = [];
						for (var i = -3; i <= scope.selectedPeriod; i++) {
							currentCategories.push(i);
						}
						/*highchart data init start*/
						var E_urbanOnline = newChartData({
							shopperKind: 'NETIZENS',
							marketID: 1,
							categoryID: 1
						});
						var E_urbanBM = newChartData({
							shopperKind: 'BMS',
							marketID: 1,
							categoryID: 1
						});
						var E_urbanMixed = newChartData({
							shopperKind: 'MIXED',
							marketID: 1,
							categoryID: 1
						});
						var E_urbanTotal = newChartData({
							shopperKind: 'ALLSHOPPERS',
							marketID: 1,
							categoryID: 1
						});

						var E_ruralOnline = newChartData({
							shopperKind: 'NETIZENS',
							marketID: 2,
							categoryID: 1
						});
						var E_ruralBM = newChartData({
							shopperKind: 'BMS',
							marketID: 2,
							categoryID: 1
						});
						var E_ruralMixed = newChartData({
							shopperKind: 'MIXED',
							marketID: 2,
							categoryID: 1
						});
						var E_ruralTotal = newChartData({
							shopperKind: 'ALLSHOPPERS',
							marketID: 2,
							categoryID: 1
						});

						var H_urbanOnline = newChartData({
							shopperKind: 'NETIZENS',
							marketID: 1,
							categoryID: 2
						});
						var H_urbanBM = newChartData({
							shopperKind: 'BMS',
							marketID: 1,
							categoryID: 2
						});
						var H_urbanMixed = newChartData({
							shopperKind: 'MIXED',
							marketID: 1,
							categoryID: 2
						});
						var H_urbanTotal = newChartData({
							shopperKind: 'ALLSHOPPERS',
							marketID: 1,
							categoryID: 2
						});

						var H_ruralOnline = newChartData({
							shopperKind: 'NETIZENS',
							marketID: 2,
							categoryID: 2
						});
						var H_ruralBM = newChartData({
							shopperKind: 'BMS',
							marketID: 2,
							categoryID: 2
						});
						var H_ruralMixed = newChartData({
							shopperKind: 'MIXED',
							marketID: 2,
							categoryID: 2
						});
						var H_ruralTotal = newChartData({
							shopperKind: 'ALLSHOPPERS',
							marketID: 2,
							categoryID: 2
						});
						/*highchart data init end*/
						/*set highchart data start*/
						var allChartsData = [];
						allChartsData.push(E_urbanOnline, E_urbanBM, E_urbanMixed, E_urbanTotal, E_ruralOnline, E_ruralBM, E_ruralMixed, E_ruralTotal,
							H_urbanOnline, H_urbanBM, H_urbanMixed, H_urbanTotal, H_ruralOnline, H_ruralBM, H_ruralMixed, H_ruralTotal);

						for (var j = 0; j < currentCategories.length; j++) {
							for (var i = 0; i < scope.feedBack.f_ShoppersShare.length; i++) {
								if (scope.feedBack.f_ShoppersShare[i].period == currentCategories[j]) {

									allChartsData.forEach(function(singleChartData) {
										if ((singleChartData.searchKeys.shopperKind == scope.feedBack.f_ShoppersShare[i].shopperKind) && (singleChartData.searchKeys.marketID == scope.feedBack.f_ShoppersShare[i].marketID) && (singleChartData.searchKeys.categoryID == scope.feedBack.f_ShoppersShare[i].categoryID)) {
											singleChartData.chartSeries[scope.feedBack.f_ShoppersShare[i].storeID - 1].data.push(scope.feedBack.f_ShoppersShare[i].value * 100);
										}
									});
								}
							}
						}

						/*set highchart data end*/
						/*set highchart function start*/
						//Category E:
						for (var i = 0; i < 7; i++) {
							if (i == 0 || i == 1 || i == 2 || i == 6) {
								E_urbanOnline.chartSeries[i].visible = false;
								E_ruralOnline.chartSeries[i].visible = false;
								H_urbanOnline.chartSeries[i].visible = false;
								H_ruralOnline.chartSeries[i].visible = false;
							}
							if (i == 3 || i == 4 || i == 5 || i == 6) {
								E_urbanBM.chartSeries[i].visible = false;
								E_ruralBM.chartSeries[i].visible = false;
								H_urbanBM.chartSeries[i].visible = false;
								H_ruralBM.chartSeries[i].visible = false;
							}
						}

						scope.E_urbanOnlineShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_urbanOnline.chartSeries,
							title: {
								text: Label.getContent('Online Only'),

							},
							loading: false
						}
						scope.E_urbanBMShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_urbanBM.chartSeries,
							title: {
								text: Label.getContent('B&M Only'),

							},
							loading: false
						}
						scope.E_urbanMixedShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_urbanMixed.chartSeries,
							title: {
								text: Label.getContent('Mixed'),

							},
							loading: false
						}
						scope.E_urbanTotalShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_urbanTotal.chartSeries,
							title: {
								text: Label.getContent('Total'),

							},
							loading: false
						}
						scope.E_ruralOnlineShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_ruralOnline.chartSeries,
							title: {
								text: Label.getContent('Online Only'),

							},
							loading: false
						}
						scope.E_ruralBMShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_ruralBM.chartSeries,
							title: {
								text: Label.getContent('B&M Only'),
							},
							loading: false
						}
						scope.E_ruralMixedShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_ruralMixed.chartSeries,
							title: {
								text: Label.getContent('Mixed'),

							},
							loading: false
						}

						scope.E_ruralTotalShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: E_ruralTotal.chartSeries,
							title: {
								text: Label.getContent('Total'),

							},
							loading: false
						}


						//Category H:
						scope.H_urbanOnlineShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_urbanOnline.chartSeries,
							title: {
								text: Label.getContent('Online Only'),

							},
							loading: false
						}
						scope.H_urbanBMShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_urbanBM.chartSeries,
							title: {
								text: Label.getContent('B&M Only'),

							},
							loading: false
						}
						scope.H_urbanMixedShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_urbanMixed.chartSeries,
							title: {
								text: Label.getContent('Mixed'),

							},
							loading: false
						}
						scope.H_urbanTotalShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_urbanTotal.chartSeries,
							title: {
								text: Label.getContent('Total'),

							},
							loading: false
						}
						scope.H_ruralOnlineShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_ruralOnline.chartSeries,
							title: {
								text: Label.getContent('Online Only'),

							},
							loading: false
						}
						scope.H_ruralBMShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_ruralBM.chartSeries,
							title: {
								text: Label.getContent('B&M Only'),

							},
							loading: false
						}
						scope.H_ruralMixedShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_ruralMixed.chartSeries,
							title: {
								text: Label.getContent('Mixed'),

							},
							loading: false
						}

						scope.H_ruralTotalShareOfShoppers = {
							options: {
								xAxis: {
									categories: currentCategories,
									title: {
										text: Label.getContent('Period'),

									}
								},
								yAxis: {
									title: {
										text: '%',

									},
									gridLineColor: 'transparent'
								},
								chart: {
									type: 'line',
									backgroundColor: 'transparent',
								},
								tooltip: {
									formatter: function() {
										var s = '<p>' + this.series.name + '</p>' + '<p>' + Label.getContent('Period') + ':' + this.key + '</p>' + '<p>' + this.point.y.toFixed(2) + '%</p>';
										return s;
									},
									shared: false,
									useHTML: true
								},
								credits: {
									enabled: false
								}
							},
							series: H_ruralTotal.chartSeries,
							title: {
								text: Label.getContent('Total'),

							},
							loading: false
						}
						scope.isPageLoading = false;
						scope.isResultShown = true;
						console.log('shopperReady');
						/*set highchart function end*/

					}

					scope.$watch('isPageShown', function(newValue, oldValue) {
						if (newValue == true) {
							initializePage();
						}
					})

				}
			}
		}
	])
})