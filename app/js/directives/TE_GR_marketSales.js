define(['directives', 'services'], function(directives) {

    directives.directive('generalMarketSales', ['Label', 'SeminarInfo', '$http', 'PeriodInfo', '$q','PlayerColor',
        function(Label, SeminarInfo, $http, PeriodInfo, $q,PlayerColor) {
            return {
                scope: {
                    isPageShown: '=',
                    isPageLoading: '=',
                    selectedPeriod: '='
                },
                restrict: 'E',
                templateUrl: '../../partials/singleReportTemplate/GR_marketSales.html',
                link: function(scope, element, attrs) {
                    
                    var elecssory_Volume = 0, elecssory_Value = 1, healthBeauty_Volume = 2, healthBeauty_Value = 3;
                    var urban = 0, rural = 1, marketTotal = 2;
                    var segmentTotal = 4 , price = 0 , value = 1 , fashion = 2 , freaks =3; 
                    var shopperTotal = 3 , bm = 0 , online = 1 , mixed = 2;
                    var producer1 = 0, producer2 = 1, producer3 = 2, producer4 = 3, retailer1 = 4, retailer2 = 5;

                    var initializePage = function() {
                        scope.isPageLoading = true;
                        scope.isResultShown = false;
                        scope.Label         = Label;
                        getResult();
                    }

                    var getResult = function() {
                        var url = '/marketSales/' + SeminarInfo.getSelectedSeminar().seminarCode + '/' + scope.selectedPeriod;

                        $http({
                            method: 'GET',
                            url: url
                        }).then(function(data) {
                            return organiseArray(data);
                        }).then(function(data) {
                            scope.isResultShown = true;
                            scope.isPageLoading = false;
                        }, function() {
                            console.log('fail');
                        });
                    }

                    var organiseArray = function(data) {
                        var deferred = $q.defer();
                        scope.totals         = new Array();
                        scope.totalChanges   = new Array();
                        scope.rurals         = new Array();
                        scope.ruralChanges   = new Array();
                        scope.urbans         = new Array();
                        scope.urbanChanges   = new Array();
                        scope.prices         = new Array();
                        scope.priceChanges   = new Array();
                        scope.values         = new Array();
                        scope.valueChanges   = new Array();
                        scope.fashions       = new Array();
                        scope.fashionChanges = new Array();
                        scope.freakss        = new Array();
                        scope.freaksChanges  = new Array();
                        scope.bms            = new Array();
                        scope.bmChanges      = new Array();
                        scope.onlines        = new Array();
                        scope.onlineChanges  = new Array();
                        scope.mixeds         = new Array();
                        scope.mixedChanges   = new Array();
                        for (var i = 0; i < 4; i++) {
                            scope.totals[i]         = new Array();
                            scope.totalChanges[i]   = new Array();
                            scope.rurals[i]         = new Array();
                            scope.ruralChanges[i]   = new Array();
                            scope.urbans[i]         = new Array();
                            scope.urbanChanges[i]   = new Array();
                            scope.prices[i]         = new Array();
                            scope.priceChanges[i]   = new Array();
                            scope.values[i]         = new Array();
                            scope.valueChanges[i]   = new Array();
                            scope.fashions[i]       = new Array();
                            scope.fashionChanges[i] = new Array();
                            scope.freakss[i]        = new Array();
                            scope.freaksChanges[i]  = new Array();
                            scope.bms[i]            = new Array();
                            scope.bmChanges[i]      = new Array();
                            scope.onlines[i]        = new Array();
                            scope.onlineChanges[i]  = new Array();
                            scope.mixeds[i]         = new Array();
                            scope.mixedChanges[i]   = new Array();
                        }

                        for (i = 0; i < data.data[0].actorInfo.length; i++) {
                            for (j = 0; j < 4; j += 2) {
                                var k = 0;
                                if (j >= 2) {
                                    k = 1;
                                };
                                //total actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].xxxx
                                scope.totals[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.totalChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.totals[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.totalChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);
                                //rural actorMarketInfo[1].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal]
                                scope.rurals[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[rural].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.ruralChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[rural].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.rurals[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[rural].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.ruralChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[rural].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);

                                //urban actorMarketInfo[0].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal]
                                scope.urbans[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[urban].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.urbanChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[urban].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.urbans[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[urban].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.urbanChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[urban].actorSegmentInfo[segmentTotal].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);

                                //prices actorMarketInfo[marketTotal].actorSegmentInfo[price].actorShopperInfo[shopperTotal]
                                scope.prices[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[price].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.priceChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[price].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.prices[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[price].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.priceChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[price].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);

                                //values actorMarketInfo[marketTotal].actorSegmentInfo[1].actorShopperInfo[shopperTotal]
                                scope.values[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[value].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.valueChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[value].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.values[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[value].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.valueChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[value].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);

                                //fashions actorMarketInfo[marketTotal].actorSegmentInfo[2].actorShopperInfo[shopperTotal]
                                scope.fashions[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[fashion].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.fashionChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[fashion].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.fashions[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[fashion].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.fashionChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[fashion].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);

                                //freakss actorMarketInfo[marketTotal].actorSegmentInfo[3].actorShopperInfo[shopperTotal]
                                scope.freakss[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[freaks].actorShopperInfo[shopperTotal].grms_MarketSalesVolume);
                                scope.freaksChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[freaks].actorShopperInfo[shopperTotal].grms_MarketSalesVolumeChange * 100);
                                scope.freakss[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[freaks].actorShopperInfo[shopperTotal].grms_MarketNetSalesValue);
                                scope.freaksChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[freaks].actorShopperInfo[shopperTotal].grms_MarketNetSalesValueChange * 100);

                                //bms actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[0]
                                scope.bms[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[bm].grms_MarketSalesVolume);
                                scope.bmChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[bm].grms_MarketSalesVolumeChange * 100);
                                scope.bms[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[bm].grms_MarketNetSalesValue);
                                scope.bmChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[bm].grms_MarketNetSalesValueChange * 100);

                                //onlines actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[1]
                                scope.onlines[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[online].grms_MarketSalesVolume);
                                scope.onlineChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[online].grms_MarketSalesVolumeChange * 100);
                                scope.onlines[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[online].grms_MarketNetSalesValue);
                                scope.onlineChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[online].grms_MarketNetSalesValueChange * 100);

                                //mixed  actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[2]
                                scope.mixeds[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[mixed].grms_MarketSalesVolume);
                                scope.mixedChanges[j].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[mixed].grms_MarketSalesVolumeChange * 100);
                                scope.mixeds[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[mixed].grms_MarketNetSalesValue);
                                scope.mixedChanges[j + 1].push(data.data[0].actorInfo[i].actorCategoryInfo[k].actorMarketInfo[marketTotal].actorSegmentInfo[segmentTotal].actorShopperInfo[mixed].grms_MarketNetSalesValueChange * 100);
                            }
                        }

                        scope.marketSales1Series = [{
                            "name": Label.getContent('Producer') + ' 1',
                            "data": [scope.totals[elecssory_Volume][producer1], 0, scope.urbans[elecssory_Volume][producer1], scope.rurals[elecssory_Volume][producer1], 0, scope.prices[elecssory_Volume][producer1], scope.values[elecssory_Volume][producer1], scope.fashions[elecssory_Volume][producer1], scope.freakss[elecssory_Volume][producer1], 0, scope.bms[elecssory_Volume][producer1], scope.onlines[elecssory_Volume][producer1], scope.mixeds[elecssory_Volume][producer1]],
                            type: "column",
                            color: PlayerColor.getColors()[producer1]
                        }, {
                            "name": Label.getContent('Producer') + ' 2',
                            "data": [scope.totals[elecssory_Volume][producer2], 0, scope.urbans[elecssory_Volume][producer2], scope.rurals[elecssory_Volume][producer2], 0, scope.prices[elecssory_Volume][producer2], scope.values[elecssory_Volume][producer2], scope.fashions[elecssory_Volume][producer2], scope.freakss[elecssory_Volume][producer2], 0, scope.bms[elecssory_Volume][producer2], scope.onlines[elecssory_Volume][producer2], scope.mixeds[elecssory_Volume][producer2]],
                            type: "column",
                            color: PlayerColor.getColors()[producer2]
                        }, {
                            "name": Label.getContent('Producer') + ' 3',
                            "data": [scope.totals[elecssory_Volume][producer3], 0, scope.urbans[elecssory_Volume][producer3], scope.rurals[elecssory_Volume][producer3], 0, scope.prices[elecssory_Volume][producer3], scope.values[elecssory_Volume][producer3], scope.fashions[elecssory_Volume][producer3], scope.freakss[elecssory_Volume][producer3], 0, scope.bms[elecssory_Volume][producer3], scope.onlines[elecssory_Volume][producer3], scope.mixeds[elecssory_Volume][producer3]],
                            type: "column",
                            color: PlayerColor.getColors()[producer3]
                        }, {
                            "name": Label.getContent('Producer') + ' 4',
                            "data": [scope.totals[elecssory_Volume][producer4], 0, scope.urbans[elecssory_Volume][producer4], scope.rurals[elecssory_Volume][producer4], 0, scope.prices[elecssory_Volume][producer4], scope.values[elecssory_Volume][producer4], scope.fashions[elecssory_Volume][producer4], scope.freakss[elecssory_Volume][producer4], 0, scope.bms[elecssory_Volume][producer4], scope.onlines[elecssory_Volume][producer4], scope.mixeds[elecssory_Volume][producer4]],
                            type: "column",
                            color: PlayerColor.getColors()[producer4]
                        }, {
                            "name": Label.getContent('Retailer') + ' 1',
                            "data": [scope.totals[elecssory_Volume][retailer1], 0, scope.urbans[elecssory_Volume][retailer1], scope.rurals[elecssory_Volume][retailer1], 0, scope.prices[elecssory_Volume][retailer1], scope.values[elecssory_Volume][retailer1], scope.fashions[elecssory_Volume][retailer1], scope.freakss[elecssory_Volume][retailer1], 0, scope.bms[elecssory_Volume][retailer1], scope.onlines[elecssory_Volume][retailer1], scope.mixeds[elecssory_Volume][retailer1]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer1]
                        }, {
                            "name": Label.getContent('Retailer') + ' 2',
                            "data": [scope.totals[elecssory_Volume][retailer2], 0, scope.urbans[elecssory_Volume][retailer2], scope.rurals[elecssory_Volume][retailer2], 0, scope.prices[elecssory_Volume][retailer2], scope.values[elecssory_Volume][retailer2], scope.fashions[elecssory_Volume][retailer2], scope.freakss[elecssory_Volume][retailer2], 0, scope.bms[elecssory_Volume][retailer2], scope.onlines[elecssory_Volume][retailer2], scope.mixeds[elecssory_Volume][retailer2]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer2]
                        }, ];

                        scope.change1s = scope.change2s = scope.change3s = scope.change4s = new Array();
                        for (var i = 0; i < 6; i++) {
                            scope.change1s[i] = scope.change2s[i] = scope.change3s[i] = scope.change4s[i] = new Array();
                        }

                        scope.change1s = [
                            [scope.totalChanges[elecssory_Volume][producer1], 0, scope.urbanChanges[elecssory_Volume][producer1], scope.ruralChanges[elecssory_Volume][producer1], 0, scope.priceChanges[elecssory_Volume][producer1], scope.valueChanges[elecssory_Volume][producer1], scope.fashionChanges[elecssory_Volume][producer1], scope.freaksChanges[elecssory_Volume][producer1], 0, scope.bmChanges[elecssory_Volume][producer1], scope.onlineChanges[elecssory_Volume][producer1], scope.mixedChanges[elecssory_Volume][producer1]],
                            [scope.totalChanges[elecssory_Volume][producer2], 0, scope.urbanChanges[elecssory_Volume][producer2], scope.ruralChanges[elecssory_Volume][producer2], 0, scope.priceChanges[elecssory_Volume][producer2], scope.valueChanges[elecssory_Volume][producer2], scope.fashionChanges[elecssory_Volume][producer2], scope.freaksChanges[elecssory_Volume][producer2], 0, scope.bmChanges[elecssory_Volume][producer2], scope.onlineChanges[elecssory_Volume][producer2], scope.mixedChanges[elecssory_Volume][producer2]],
                            [scope.totalChanges[elecssory_Volume][producer3], 0, scope.urbanChanges[elecssory_Volume][producer3], scope.ruralChanges[elecssory_Volume][producer3], 0, scope.priceChanges[elecssory_Volume][producer3], scope.valueChanges[elecssory_Volume][producer3], scope.fashionChanges[elecssory_Volume][producer3], scope.freaksChanges[elecssory_Volume][producer3], 0, scope.bmChanges[elecssory_Volume][producer3], scope.onlineChanges[elecssory_Volume][producer3], scope.mixedChanges[elecssory_Volume][producer3]],
                            [scope.totalChanges[elecssory_Volume][producer4], 0, scope.urbanChanges[elecssory_Volume][producer4], scope.ruralChanges[elecssory_Volume][producer4], 0, scope.priceChanges[elecssory_Volume][producer4], scope.valueChanges[elecssory_Volume][producer4], scope.fashionChanges[elecssory_Volume][producer4], scope.freaksChanges[elecssory_Volume][producer4], 0, scope.bmChanges[elecssory_Volume][producer4], scope.onlineChanges[elecssory_Volume][producer4], scope.mixedChanges[elecssory_Volume][producer4]],
                            [scope.totalChanges[elecssory_Volume][retailer1], 0, scope.urbanChanges[elecssory_Volume][retailer1], scope.ruralChanges[elecssory_Volume][retailer1], 0, scope.priceChanges[elecssory_Volume][retailer1], scope.valueChanges[elecssory_Volume][retailer1], scope.fashionChanges[elecssory_Volume][retailer1], scope.freaksChanges[elecssory_Volume][retailer1], 0, scope.bmChanges[elecssory_Volume][retailer1], scope.onlineChanges[elecssory_Volume][retailer1], scope.mixedChanges[elecssory_Volume][retailer1]],
                            [scope.totalChanges[elecssory_Volume][retailer2], 0, scope.urbanChanges[elecssory_Volume][retailer2], scope.ruralChanges[elecssory_Volume][retailer2], 0, scope.priceChanges[elecssory_Volume][retailer2], scope.valueChanges[elecssory_Volume][retailer2], scope.fashionChanges[elecssory_Volume][retailer2], scope.freaksChanges[elecssory_Volume][retailer2], 0, scope.bmChanges[elecssory_Volume][retailer2], scope.onlineChanges[elecssory_Volume][retailer2], scope.mixedChanges[elecssory_Volume][retailer2]]
                        ];

                        scope.marketSales1Config = {
                            options: {
                                xAxis: {
                                    categories: [Label.getContent('Total'), '', Label.getContent('Urban'), Label.getContent('Rural'), '', Label.getContent('Price Sensitive'), Label.getContent('Value for Money'), Label.getContent('Fashion'), Label.getContent('Freaks'), '', Label.getContent('B&M Only'), Label.getContent('Online Only'), Label.getContent('Mixed')]
                                },
                                yAxis: {
                                    title: {
                                        text: "units mln"
                                    }
                                },
                                chart: {
                                    type: 'areaspline'
                                },
                                tooltip: {
                                    formatter: function() {
                                        var index = 0;
                                        if (this.series._i >= 6) {
                                            index = this.series._i - 6;
                                        } else {
                                            index = this.series._i;
                                        }
                                        var s = '<p><b>' + this.series.name + '</b></p>' + '<p>' + Label.getContent('Volume Sales') + ':' + this.point.y.toFixed(2) + '(units mln)</p>' + '<p>' + scope.change1s[index][this.point.x].toFixed(2) + ' ' + Label.getContent('over previous period') + '</p>';
                                        return s;
                                    },
                                    shared: false,
                                    useHTML: true
                                },
                                plotOptions: {
                                    series: {
                                        stacking: 'normal'
                                    }
                                }
                            },
                            series: scope.marketSales1Series,
                            title: {
                                text: Label.getContent('Elecssories') + ' - ' + Label.getContent('Volume Sales')
                            },
                            subtitle: {
                                text: '<p class="my-text-left">' + Label.getContent('Total') + '</p><p class="my-text-center-left">' + Label.getContent('by Market') + '</p><p class="my-text-center-right">' + Label.getContent('by Consumer Segment') + '</p><p class="my-text-right">' + Label.getContent('by Shopper Segment') + '</p>',
                                useHTML: true,
                            },
                            credits: {
                                enabled: false
                            },
                            loading: false
                        }

                        scope.marketSales2Series = [{
                            "name": Label.getContent('Producer') + ' 1',
                            "data": [scope.totals[elecssory_Value][producer1], 0, scope.urbans[elecssory_Value][producer1], scope.rurals[elecssory_Value][producer1], 0, scope.prices[elecssory_Value][producer1], scope.values[elecssory_Value][producer1], scope.fashions[elecssory_Value][producer1], scope.freakss[elecssory_Value][producer1], 0, scope.bms[elecssory_Value][producer1], scope.onlines[elecssory_Value][producer1], scope.mixeds[elecssory_Value][producer1]],
                            type: "column",
                            color: PlayerColor.getColors()[producer1]
                        }, {
                            "name": Label.getContent('Producer') + ' 2',
                            "data": [scope.totals[elecssory_Value][producer2], 0, scope.urbans[elecssory_Value][producer2], scope.rurals[elecssory_Value][producer2], 0, scope.prices[elecssory_Value][producer2], scope.values[elecssory_Value][producer2], scope.fashions[elecssory_Value][producer2], scope.freakss[elecssory_Value][producer2], 0, scope.bms[elecssory_Value][producer2], scope.onlines[elecssory_Value][producer2], scope.mixeds[elecssory_Value][producer2]],
                            type: "column",
                            color: PlayerColor.getColors()[producer2]
                        }, {
                            "name": Label.getContent('Producer') + ' 3',
                            "data": [scope.totals[elecssory_Value][producer3], 0, scope.urbans[elecssory_Value][producer3], scope.rurals[elecssory_Value][producer3], 0, scope.prices[elecssory_Value][producer3], scope.values[elecssory_Value][producer3], scope.fashions[elecssory_Value][producer3], scope.freakss[elecssory_Value][producer3], 0, scope.bms[elecssory_Value][producer3], scope.onlines[elecssory_Value][producer3], scope.mixeds[elecssory_Value][producer3]],
                            type: "column",
                            color: PlayerColor.getColors()[producer3]
                        }, {
                            "name": Label.getContent('Producer') + ' 4',
                            "data": [scope.totals[elecssory_Value][producer4], 0, scope.urbans[elecssory_Value][producer4], scope.rurals[elecssory_Value][producer4], 0, scope.prices[elecssory_Value][producer4], scope.values[elecssory_Value][producer4], scope.fashions[elecssory_Value][producer4], scope.freakss[elecssory_Value][producer4], 0, scope.bms[elecssory_Value][producer4], scope.onlines[elecssory_Value][producer4], scope.mixeds[elecssory_Value][producer4]],
                            type: "column",
                            color: PlayerColor.getColors()[producer4]
                        }, {
                            "name": Label.getContent('Retailer') + ' 1',
                            "data": [scope.totals[elecssory_Value][retailer1], 0, scope.urbans[elecssory_Value][retailer1], scope.rurals[elecssory_Value][retailer1], 0, scope.prices[elecssory_Value][retailer1], scope.values[elecssory_Value][retailer1], scope.fashions[elecssory_Value][retailer1], scope.freakss[elecssory_Value][retailer1], 0, scope.bms[elecssory_Value][retailer1], scope.onlines[elecssory_Value][retailer1], scope.mixeds[elecssory_Value][retailer1]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer1]
                        }, {
                            "name": Label.getContent('Retailer') + ' 2',
                            "data": [scope.totals[elecssory_Value][retailer2], 0, scope.urbans[elecssory_Value][retailer2], scope.rurals[elecssory_Value][retailer2], 0, scope.prices[elecssory_Value][retailer2], scope.values[elecssory_Value][retailer2], scope.fashions[elecssory_Value][retailer2], scope.freakss[elecssory_Value][retailer2], 0, scope.bms[elecssory_Value][retailer2], scope.onlines[elecssory_Value][retailer2], scope.mixeds[elecssory_Value][retailer2]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer2]
                        }, ];

                        scope.change2s = new Array();
                        for (i = 0; i < 6; i++) {
                            scope.change2s[i] = new Array();
                        }

                        scope.change2s = [
                            [scope.totalChanges[elecssory_Value][producer1], 0, scope.urbanChanges[elecssory_Value][producer1], scope.ruralChanges[elecssory_Value][producer1], 0, scope.priceChanges[elecssory_Value][producer1], scope.valueChanges[elecssory_Value][producer1], scope.fashionChanges[elecssory_Value][producer1], scope.freaksChanges[elecssory_Value][producer1], 0, scope.bmChanges[elecssory_Value][producer1], scope.onlineChanges[elecssory_Value][producer1], scope.mixedChanges[elecssory_Value][producer1]],
                            [scope.totalChanges[elecssory_Value][producer2], 0, scope.urbanChanges[elecssory_Value][producer2], scope.ruralChanges[elecssory_Value][producer2], 0, scope.priceChanges[elecssory_Value][producer2], scope.valueChanges[elecssory_Value][producer2], scope.fashionChanges[elecssory_Value][producer2], scope.freaksChanges[elecssory_Value][producer2], 0, scope.bmChanges[elecssory_Value][producer2], scope.onlineChanges[elecssory_Value][producer2], scope.mixedChanges[elecssory_Value][producer2]],
                            [scope.totalChanges[elecssory_Value][producer3], 0, scope.urbanChanges[elecssory_Value][producer3], scope.ruralChanges[elecssory_Value][producer3], 0, scope.priceChanges[elecssory_Value][producer3], scope.valueChanges[elecssory_Value][producer3], scope.fashionChanges[elecssory_Value][producer3], scope.freaksChanges[elecssory_Value][producer3], 0, scope.bmChanges[elecssory_Value][producer3], scope.onlineChanges[elecssory_Value][producer3], scope.mixedChanges[elecssory_Value][producer3]],
                            [scope.totalChanges[elecssory_Value][producer4], 0, scope.urbanChanges[elecssory_Value][producer4], scope.ruralChanges[elecssory_Value][producer4], 0, scope.priceChanges[elecssory_Value][producer4], scope.valueChanges[elecssory_Value][producer4], scope.fashionChanges[elecssory_Value][producer4], scope.freaksChanges[elecssory_Value][producer4], 0, scope.bmChanges[elecssory_Value][producer4], scope.onlineChanges[elecssory_Value][producer4], scope.mixedChanges[elecssory_Value][producer4]],
                            [scope.totalChanges[elecssory_Value][retailer1], 0, scope.urbanChanges[elecssory_Value][retailer1], scope.ruralChanges[elecssory_Value][retailer1], 0, scope.priceChanges[elecssory_Value][retailer1], scope.valueChanges[elecssory_Value][retailer1], scope.fashionChanges[elecssory_Value][retailer1], scope.freaksChanges[elecssory_Value][retailer1], 0, scope.bmChanges[elecssory_Value][retailer1], scope.onlineChanges[elecssory_Value][retailer1], scope.mixedChanges[elecssory_Value][retailer1]],
                            [scope.totalChanges[elecssory_Value][retailer2], 0, scope.urbanChanges[elecssory_Value][retailer2], scope.ruralChanges[elecssory_Value][retailer2], 0, scope.priceChanges[elecssory_Value][retailer2], scope.valueChanges[elecssory_Value][retailer2], scope.fashionChanges[elecssory_Value][retailer2], scope.freaksChanges[elecssory_Value][retailer2], 0, scope.bmChanges[elecssory_Value][retailer2], scope.onlineChanges[elecssory_Value][retailer2], scope.mixedChanges[elecssory_Value][retailer2]]
                        ];


                        scope.marketSales2Config = {
                            options: {
                                xAxis: {
                                    categories: [Label.getContent('Total'), '', Label.getContent('Urban'), Label.getContent('Rural'), '', Label.getContent('Price Sensitive'), Label.getContent('Value for Money'), Label.getContent('Fashion'), Label.getContent('Freaks'), '', Label.getContent('B&M Only'), Label.getContent('Online Only'), Label.getContent('Mixed')]
                                },
                                yAxis: {
                                    title: {
                                        text: "$mln"
                                    }
                                },
                                chart: {
                                    type: 'areaspline'
                                },
                                tooltip: {
                                    formatter: function() {
                                        var index = 0;
                                        if (this.series._i >= 6) {
                                            index = this.series._i - 6;
                                        } else {
                                            index = this.series._i;
                                        }
                                        var s = '<p><b>' + this.series.name + '</b></p>' + '<p>' + Label.getContent('Value Sales') + ':' + this.point.y.toFixed(2) + '($mln)</p>' + '<p>' + scope.change2s[index][this.point.x].toFixed(2) + ' ' + Label.getContent('over previous period') + '</p>';
                                        return s;
                                    },
                                    shared: false,
                                    useHTML: true
                                },
                                plotOptions: {
                                    series: {
                                        stacking: 'normal'
                                    }
                                }
                            },
                            series: scope.marketSales2Series,
                            title: {
                                text: Label.getContent('Elecssories') + ' - ' + Label.getContent('Value Sales')
                            },
                            subtitle: {
                                text: '<p class="my-text-left">' + Label.getContent('Total') + '</p><p class="my-text-center-left">' + Label.getContent('by Market') + '</p><p class="my-text-center-right">' + Label.getContent('by Consumer Segment') + '</p><p class="my-text-right">' + Label.getContent('by Shopper Segment') + '</p>',
                                useHTML: true,
                            },
                            credits: {
                                enabled: false
                            },
                            loading: false
                        }

                        scope.marketSales3Series = [{
                            "name": Label.getContent('Producer') + ' 1',
                            "data": [scope.totals[healthBeauty_Volume][producer1], 0, scope.urbans[healthBeauty_Volume][producer1], scope.rurals[healthBeauty_Volume][producer1], 0, scope.prices[healthBeauty_Volume][producer1], scope.values[healthBeauty_Volume][producer1], scope.fashions[healthBeauty_Volume][producer1], scope.freakss[healthBeauty_Volume][producer1], 0, scope.bms[healthBeauty_Volume][producer1], scope.onlines[healthBeauty_Volume][producer1], scope.mixeds[healthBeauty_Volume][producer1]],
                            type: "column",
                            color: PlayerColor.getColors()[producer1]
                        }, {
                            "name": Label.getContent('Producer') + ' 2',
                            "data": [scope.totals[healthBeauty_Volume][producer2], 0, scope.urbans[healthBeauty_Volume][producer2], scope.rurals[healthBeauty_Volume][producer2], 0, scope.prices[healthBeauty_Volume][producer2], scope.values[healthBeauty_Volume][producer2], scope.fashions[healthBeauty_Volume][producer2], scope.freakss[healthBeauty_Volume][producer2], 0, scope.bms[healthBeauty_Volume][producer2], scope.onlines[healthBeauty_Volume][producer2], scope.mixeds[healthBeauty_Volume][producer2]],
                            type: "column",
                            color: PlayerColor.getColors()[producer2]
                        }, {
                            "name": Label.getContent('Producer') + ' 3',
                            "data": [scope.totals[healthBeauty_Volume][producer3], 0, scope.urbans[healthBeauty_Volume][producer3], scope.rurals[healthBeauty_Volume][producer3], 0, scope.prices[healthBeauty_Volume][producer3], scope.values[healthBeauty_Volume][producer3], scope.fashions[healthBeauty_Volume][producer3], scope.freakss[healthBeauty_Volume][producer3], 0, scope.bms[healthBeauty_Volume][producer3], scope.onlines[healthBeauty_Volume][producer3], scope.mixeds[healthBeauty_Volume][producer3]],
                            type: "column",
                            color: PlayerColor.getColors()[producer3]
                        }, {
                            "name": Label.getContent('Producer') + ' 4',
                            "data": [scope.totals[healthBeauty_Volume][producer4], 0, scope.urbans[healthBeauty_Volume][producer4], scope.rurals[healthBeauty_Volume][producer4], 0, scope.prices[healthBeauty_Volume][producer4], scope.values[healthBeauty_Volume][producer4], scope.fashions[healthBeauty_Volume][producer4], scope.freakss[healthBeauty_Volume][producer4], 0, scope.bms[healthBeauty_Volume][producer4], scope.onlines[healthBeauty_Volume][producer4], scope.mixeds[healthBeauty_Volume][producer4]],
                            type: "column",
                            color: PlayerColor.getColors()[producer4]
                        }, {
                            "name": Label.getContent('Retailer') + ' 1',
                            "data": [scope.totals[healthBeauty_Volume][retailer1], 0, scope.urbans[healthBeauty_Volume][retailer1], scope.rurals[healthBeauty_Volume][retailer1], 0, scope.prices[healthBeauty_Volume][retailer1], scope.values[healthBeauty_Volume][retailer1], scope.fashions[healthBeauty_Volume][retailer1], scope.freakss[healthBeauty_Volume][retailer1], 0, scope.bms[healthBeauty_Volume][retailer1], scope.onlines[healthBeauty_Volume][retailer1], scope.mixeds[healthBeauty_Volume][retailer1]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer1]
                        }, {
                            "name": Label.getContent('Retailer') + ' 2',
                            "data": [scope.totals[healthBeauty_Volume][retailer2], 0, scope.urbans[healthBeauty_Volume][retailer2], scope.rurals[healthBeauty_Volume][retailer2], 0, scope.prices[healthBeauty_Volume][retailer2], scope.values[healthBeauty_Volume][retailer2], scope.fashions[healthBeauty_Volume][retailer2], scope.freakss[healthBeauty_Volume][retailer2], 0, scope.bms[healthBeauty_Volume][retailer2], scope.onlines[healthBeauty_Volume][retailer2], scope.mixeds[healthBeauty_Volume][retailer2]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer2]
                        }, ];

                        scope.change3s = new Array();
                        for (i = 0; i < 6; i++) {
                            scope.change3s[i] = new Array();
                        }

                        scope.change3s = [
                            [scope.totalChanges[healthBeauty_Volume][producer1], 0, scope.urbanChanges[healthBeauty_Volume][producer1], scope.ruralChanges[healthBeauty_Volume][producer1], 0, scope.priceChanges[healthBeauty_Volume][producer1], scope.valueChanges[healthBeauty_Volume][producer1], scope.fashionChanges[healthBeauty_Volume][producer1], scope.freaksChanges[healthBeauty_Volume][producer1], 0, scope.bmChanges[healthBeauty_Volume][producer1], scope.onlineChanges[healthBeauty_Volume][producer1], scope.mixedChanges[healthBeauty_Volume][producer1]],
                            [scope.totalChanges[healthBeauty_Volume][producer2], 0, scope.urbanChanges[healthBeauty_Volume][producer2], scope.ruralChanges[healthBeauty_Volume][producer2], 0, scope.priceChanges[healthBeauty_Volume][producer2], scope.valueChanges[healthBeauty_Volume][producer2], scope.fashionChanges[healthBeauty_Volume][producer2], scope.freaksChanges[healthBeauty_Volume][producer2], 0, scope.bmChanges[healthBeauty_Volume][producer2], scope.onlineChanges[healthBeauty_Volume][producer2], scope.mixedChanges[healthBeauty_Volume][producer2]],
                            [scope.totalChanges[healthBeauty_Volume][producer3], 0, scope.urbanChanges[healthBeauty_Volume][producer3], scope.ruralChanges[healthBeauty_Volume][producer3], 0, scope.priceChanges[healthBeauty_Volume][producer3], scope.valueChanges[healthBeauty_Volume][producer3], scope.fashionChanges[healthBeauty_Volume][producer3], scope.freaksChanges[healthBeauty_Volume][producer3], 0, scope.bmChanges[healthBeauty_Volume][producer3], scope.onlineChanges[healthBeauty_Volume][producer3], scope.mixedChanges[healthBeauty_Volume][producer3]],
                            [scope.totalChanges[healthBeauty_Volume][producer4], 0, scope.urbanChanges[healthBeauty_Volume][producer4], scope.ruralChanges[healthBeauty_Volume][producer4], 0, scope.priceChanges[healthBeauty_Volume][producer4], scope.valueChanges[healthBeauty_Volume][producer4], scope.fashionChanges[healthBeauty_Volume][producer4], scope.freaksChanges[healthBeauty_Volume][producer4], 0, scope.bmChanges[healthBeauty_Volume][producer4], scope.onlineChanges[healthBeauty_Volume][producer4], scope.mixedChanges[healthBeauty_Volume][producer4]],
                            [scope.totalChanges[healthBeauty_Volume][retailer1], 0, scope.urbanChanges[healthBeauty_Volume][retailer1], scope.ruralChanges[healthBeauty_Volume][retailer1], 0, scope.priceChanges[healthBeauty_Volume][retailer1], scope.valueChanges[healthBeauty_Volume][retailer1], scope.fashionChanges[healthBeauty_Volume][retailer1], scope.freaksChanges[healthBeauty_Volume][retailer1], 0, scope.bmChanges[healthBeauty_Volume][retailer1], scope.onlineChanges[healthBeauty_Volume][retailer1], scope.mixedChanges[healthBeauty_Volume][retailer1]],
                            [scope.totalChanges[healthBeauty_Volume][retailer2], 0, scope.urbanChanges[healthBeauty_Volume][retailer2], scope.ruralChanges[healthBeauty_Volume][retailer2], 0, scope.priceChanges[healthBeauty_Volume][retailer2], scope.valueChanges[healthBeauty_Volume][retailer2], scope.fashionChanges[healthBeauty_Volume][retailer2], scope.freaksChanges[healthBeauty_Volume][retailer2], 0, scope.bmChanges[healthBeauty_Volume][retailer2], scope.onlineChanges[healthBeauty_Volume][retailer2], scope.mixedChanges[healthBeauty_Volume][retailer2]]
                        ];

                        scope.marketSales3Config = {
                            options: {
                                xAxis: {
                                    categories: [Label.getContent('Total'), '', Label.getContent('Urban'), Label.getContent('Rural'), '', Label.getContent('Price Sensitive'), Label.getContent('Value for Money'), Label.getContent('Health Conscious'), Label.getContent('Impatient'), '', Label.getContent('B&M Only'), Label.getContent('Online Only'), Label.getContent('Mixed')]
                                },
                                yAxis: {
                                    title: {
                                        text: "units mln"
                                    }
                                },
                                chart: {
                                    type: 'areaspline'
                                },
                                tooltip: {
                                    formatter: function() {
                                        var index = 0;
                                        if (this.series._i >= 6) {
                                            index = this.series._i - 6;
                                        } else {
                                            index = this.series._i;
                                        }
                                        var s = '<p><b>' + this.series.name + '</b></p>' + '<p>' + Label.getContent('Volume Sales') + ':' + this.point.y.toFixed(2) + '(units mln)</p>' + '<p>' + scope.change3s[index][this.point.x].toFixed(2) + ' ' + Label.getContent('over previous period') + '</p>';
                                        return s;
                                    },
                                    shared: false,
                                    useHTML: true
                                },
                                plotOptions: {
                                    series: {
                                        stacking: 'normal'
                                    }
                                }
                            },
                            series: scope.marketSales3Series,
                            title: {
                                text: Label.getContent('HealthBeauties') + ' - ' + Label.getContent('Volume Sales')
                            },
                            subtitle: {
                                text: '<p class="my-text-left">' + Label.getContent('Total') + '</p><p class="my-text-center-left">' + Label.getContent('by Market') + '</p><p class="my-text-center-right">' + Label.getContent('by Consumer Segment') + '</p><p class="my-text-right">' + Label.getContent('by Shopper Segment') + '</p>',
                                useHTML: true,
                            },
                            credits: {
                                enabled: false
                            },
                            loading: false
                        }

                        scope.marketSales4Series = [{
                            "name": Label.getContent('Producer') + ' 1',
                            "data": [scope.totals[healthBeauty_Value][producer1], 0, scope.urbans[healthBeauty_Value][producer1], scope.rurals[healthBeauty_Value][producer1], 0, scope.prices[healthBeauty_Value][producer1], scope.values[healthBeauty_Value][producer1], scope.fashions[healthBeauty_Value][producer1], scope.freakss[healthBeauty_Value][producer1], 0, scope.bms[healthBeauty_Value][producer1], scope.onlines[healthBeauty_Value][producer1], scope.mixeds[healthBeauty_Value][producer1]],
                            type: "column",
                            color: PlayerColor.getColors()[producer1]
                        }, {
                            "name": Label.getContent('Producer') + ' 2',
                            "data": [scope.totals[healthBeauty_Value][producer2], 0, scope.urbans[healthBeauty_Value][producer2], scope.rurals[healthBeauty_Value][producer2], 0, scope.prices[healthBeauty_Value][producer2], scope.values[healthBeauty_Value][producer2], scope.fashions[healthBeauty_Value][producer2], scope.freakss[healthBeauty_Value][producer2], 0, scope.bms[healthBeauty_Value][producer2], scope.onlines[healthBeauty_Value][producer2], scope.mixeds[healthBeauty_Value][producer2]],
                            type: "column",
                            color: PlayerColor.getColors()[producer2]
                        }, {
                            "name": Label.getContent('Producer') + ' 3',
                            "data": [scope.totals[healthBeauty_Value][producer3], 0, scope.urbans[healthBeauty_Value][producer3], scope.rurals[healthBeauty_Value][producer3], 0, scope.prices[healthBeauty_Value][producer3], scope.values[healthBeauty_Value][producer3], scope.fashions[healthBeauty_Value][producer3], scope.freakss[healthBeauty_Value][producer3], 0, scope.bms[healthBeauty_Value][producer3], scope.onlines[healthBeauty_Value][producer3], scope.mixeds[healthBeauty_Value][producer3]],
                            type: "column",
                            color: PlayerColor.getColors()[producer3]
                        }, {
                            "name": Label.getContent('Producer') + ' 4',
                            "data": [scope.totals[healthBeauty_Value][producer4], 0, scope.urbans[healthBeauty_Value][producer4], scope.rurals[healthBeauty_Value][producer4], 0, scope.prices[healthBeauty_Value][producer4], scope.values[healthBeauty_Value][producer4], scope.fashions[healthBeauty_Value][producer4], scope.freakss[healthBeauty_Value][producer4], 0, scope.bms[healthBeauty_Value][producer4], scope.onlines[healthBeauty_Value][producer4], scope.mixeds[healthBeauty_Value][producer4]],
                            type: "column",
                            color: PlayerColor.getColors()[producer4]
                        }, {
                            "name": Label.getContent('Retailer') + ' 1',
                            "data": [scope.totals[healthBeauty_Value][retailer1], 0, scope.urbans[healthBeauty_Value][retailer1], scope.rurals[healthBeauty_Value][retailer1], 0, scope.prices[healthBeauty_Value][retailer1], scope.values[healthBeauty_Value][retailer1], scope.fashions[healthBeauty_Value][retailer1], scope.freakss[healthBeauty_Value][retailer1], 0, scope.bms[healthBeauty_Value][retailer1], scope.onlines[healthBeauty_Value][retailer1], scope.mixeds[healthBeauty_Value][retailer1]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer1]
                        }, {
                            "name": Label.getContent('Retailer') + ' 2',
                            "data": [scope.totals[healthBeauty_Value][retailer2], 0, scope.urbans[healthBeauty_Value][retailer2], scope.rurals[healthBeauty_Value][retailer2], 0, scope.prices[healthBeauty_Value][retailer2], scope.values[healthBeauty_Value][retailer2], scope.fashions[healthBeauty_Value][retailer2], scope.freakss[healthBeauty_Value][retailer2], 0, scope.bms[healthBeauty_Value][retailer2], scope.onlines[healthBeauty_Value][retailer2], scope.mixeds[healthBeauty_Value][retailer2]],
                            type: "column",
                            color: PlayerColor.getColors()[retailer2]
                        }, ];
                        scope.change4s = new Array();
                        for (i = 0; i < 6; i++) {
                            scope.change4s[i] = new Array();
                        }

                        scope.change4s = [
                            [scope.totalChanges[healthBeauty_Value][producer1], 0, scope.urbanChanges[healthBeauty_Value][producer1], scope.ruralChanges[healthBeauty_Value][producer1], 0, scope.priceChanges[healthBeauty_Value][producer1], scope.valueChanges[healthBeauty_Value][producer1], scope.fashionChanges[healthBeauty_Value][producer1], scope.freaksChanges[healthBeauty_Value][producer1], 0, scope.bmChanges[healthBeauty_Value][producer1], scope.onlineChanges[healthBeauty_Value][producer1], scope.mixedChanges[healthBeauty_Value][producer1]],
                            [scope.totalChanges[healthBeauty_Value][producer2], 0, scope.urbanChanges[healthBeauty_Value][producer2], scope.ruralChanges[healthBeauty_Value][producer2], 0, scope.priceChanges[healthBeauty_Value][producer2], scope.valueChanges[healthBeauty_Value][producer2], scope.fashionChanges[healthBeauty_Value][producer2], scope.freaksChanges[healthBeauty_Value][producer2], 0, scope.bmChanges[healthBeauty_Value][producer2], scope.onlineChanges[healthBeauty_Value][producer2], scope.mixedChanges[healthBeauty_Value][producer2]],
                            [scope.totalChanges[healthBeauty_Value][producer3], 0, scope.urbanChanges[healthBeauty_Value][producer3], scope.ruralChanges[healthBeauty_Value][producer3], 0, scope.priceChanges[healthBeauty_Value][producer3], scope.valueChanges[healthBeauty_Value][producer3], scope.fashionChanges[healthBeauty_Value][producer3], scope.freaksChanges[healthBeauty_Value][producer3], 0, scope.bmChanges[healthBeauty_Value][producer3], scope.onlineChanges[healthBeauty_Value][producer3], scope.mixedChanges[healthBeauty_Value][producer3]],
                            [scope.totalChanges[healthBeauty_Value][producer4], 0, scope.urbanChanges[healthBeauty_Value][producer4], scope.ruralChanges[healthBeauty_Value][producer4], 0, scope.priceChanges[healthBeauty_Value][producer4], scope.valueChanges[healthBeauty_Value][producer4], scope.fashionChanges[healthBeauty_Value][producer4], scope.freaksChanges[healthBeauty_Value][producer4], 0, scope.bmChanges[healthBeauty_Value][producer4], scope.onlineChanges[healthBeauty_Value][producer4], scope.mixedChanges[healthBeauty_Value][producer4]],
                            [scope.totalChanges[healthBeauty_Value][retailer1], 0, scope.urbanChanges[healthBeauty_Value][retailer1], scope.ruralChanges[healthBeauty_Value][retailer1], 0, scope.priceChanges[healthBeauty_Value][retailer1], scope.valueChanges[healthBeauty_Value][retailer1], scope.fashionChanges[healthBeauty_Value][retailer1], scope.freaksChanges[healthBeauty_Value][retailer1], 0, scope.bmChanges[healthBeauty_Value][retailer1], scope.onlineChanges[healthBeauty_Value][retailer1], scope.mixedChanges[healthBeauty_Value][retailer1]],
                            [scope.totalChanges[healthBeauty_Value][retailer2], 0, scope.urbanChanges[healthBeauty_Value][retailer2], scope.ruralChanges[healthBeauty_Value][retailer2], 0, scope.priceChanges[healthBeauty_Value][retailer2], scope.valueChanges[healthBeauty_Value][retailer2], scope.fashionChanges[healthBeauty_Value][retailer2], scope.freaksChanges[healthBeauty_Value][retailer2], 0, scope.bmChanges[healthBeauty_Value][retailer2], scope.onlineChanges[healthBeauty_Value][retailer2], scope.mixedChanges[healthBeauty_Value][retailer2]]
                        ];

                        scope.marketSales4Config = {
                            options: {
                                xAxis: {
                                    categories: [Label.getContent('Total'), '', Label.getContent('Urban'), Label.getContent('Rural'), '', Label.getContent('Price Sensitive'), Label.getContent('Value for Money'), Label.getContent('Health Conscious'), Label.getContent('Impatient'), '', Label.getContent('B&M Only'), Label.getContent('Online Only'), Label.getContent('Mixed')]
                                },
                                yAxis: {
                                    title: {
                                        text: "$mln"
                                    }
                                },
                                chart: {
                                    type: 'areaspline'
                                },
                                tooltip: {
                                    formatter: function() {
                                        var index = 0;
                                        if (this.series._i >= 6) {
                                            index = this.series._i - 6;
                                        } else {
                                            index = this.series._i;
                                        }
                                        var s = '<p><b>' + this.series.name + '</b></p>' + '<p>' + Label.getContent('Value Sales') + ':' + this.point.y.toFixed(2) + '($mln)</p>' + '<p>' + scope.change4s[index][this.point.x].toFixed(2) + ' ' + Label.getContent('over previous period') + '</p>';
                                        return s;
                                    },
                                    shared: false,
                                    useHTML: true
                                },
                                plotOptions: {
                                    series: {
                                        stacking: 'normal'
                                    }
                                }
                            },
                            series: scope.marketSales4Series,
                            title: {
                                text: Label.getContent('HealthBeauties') + ' - ' + Label.getContent('Value Sales')
                            },
                            subtitle: {
                                text: '<p class="my-text-left">' + Label.getContent('Total') + '</p><p class="my-text-center-left">' + Label.getContent('by Market') + '</p><p class="my-text-center-right">' + Label.getContent('by Consumer Segment') + '</p><p class="my-text-right">' + Label.getContent('by Shopper Segment') + '</p>',
                                useHTML: true,
                            },
                            credits: {
                                enabled: false
                            },
                            loading: false
                        }

                        deferred.resolve({
                            msg: 'Array is ready.'
                        });
                        return deferred.promise;
                    }


                    scope.$watch('isPageShown', function(newValue, oldValue) {
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