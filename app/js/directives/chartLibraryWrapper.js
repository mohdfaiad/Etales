define(['directives'], function(directives) {
        directives.directive('currentSalesVolumeElecssories',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSalesVolumeElecssories').empty();
                        var draw=function(){
                            $('#currentSalesVolumeElecssories').highcharts({
                                xAxis:scope.currentSalesVolumeElecssories.options.xAxis,
                                yAxis:scope.currentSalesVolumeElecssories.options.yAxis,
                                tooltip:scope.currentSalesVolumeElecssories.options.tooltip,
                                series:scope.currentSalesVolumeElecssories.series,
                                title:scope.currentSalesVolumeElecssories.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('currentSalesValueElecssories',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSalesValueElecssories').empty();
                        var draw=function(){
                            $('#currentSalesValueElecssories').highcharts({
                                xAxis:scope.currentSalesValueElecssories.options.xAxis,
                                yAxis:scope.currentSalesValueElecssories.options.yAxis,
                                tooltip:scope.currentSalesValueElecssories.options.tooltip,
                                series:scope.currentSalesValueElecssories.series,
                                title:scope.currentSalesValueElecssories.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('currentSalesVolumeHealthBeauties',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSalesVolumeHealthBeauties').empty();
                        var draw=function(){
                            $('#currentSalesVolumeHealthBeauties').highcharts({
                                xAxis:scope.currentSalesVolumeHealthBeauties.options.xAxis,
                                yAxis:scope.currentSalesVolumeHealthBeauties.options.yAxis,
                                tooltip:scope.currentSalesVolumeHealthBeauties.options.tooltip,
                                series:scope.currentSalesVolumeHealthBeauties.series,
                                title:scope.currentSalesVolumeHealthBeauties.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('currentSalesValueHealthBeauties',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSalesValueHealthBeauties').empty();
                        var draw=function(){
                            $('#currentSalesValueHealthBeauties').highcharts({
                                xAxis:scope.currentSalesValueHealthBeauties.options.xAxis,
                                yAxis:scope.currentSalesValueHealthBeauties.options.yAxis,
                                tooltip:scope.currentSalesValueHealthBeauties.options.tooltip,
                                series:scope.currentSalesValueHealthBeauties.series,
                                title:scope.currentSalesValueHealthBeauties.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        
        .directive('currentSharesVolumeElecssories',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSharesVolumeElecssories').empty();
                        var draw=function(){
                            $('#currentSharesVolumeElecssories').highcharts({
                                xAxis:scope.currentSharesVolumeElecssories.options.xAxis,
                                yAxis:scope.currentSharesVolumeElecssories.options.yAxis,
                                tooltip:scope.currentSharesVolumeElecssories.options.tooltip,
                                series:scope.currentSharesVolumeElecssories.series,
                                title:scope.currentSharesVolumeElecssories.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentSharesValueElecssories',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSharesValueElecssories').empty();
                        var draw=function(){
                            $('#currentSharesValueElecssories').highcharts({
                                xAxis:scope.currentSharesValueElecssories.options.xAxis,
                                yAxis:scope.currentSharesValueElecssories.options.yAxis,
                                tooltip:scope.currentSharesValueElecssories.options.tooltip,
                                series:scope.currentSharesValueElecssories.series,
                                title:scope.currentSharesValueElecssories.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentSharesVolumeHealthBeauties',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSharesVolumeHealthBeauties').empty();
                        var draw=function(){
                            $('#currentSharesVolumeHealthBeauties').highcharts({
                                xAxis:scope.currentSharesVolumeHealthBeauties.options.xAxis,
                                yAxis:scope.currentSharesVolumeHealthBeauties.options.yAxis,
                                tooltip:scope.currentSharesVolumeHealthBeauties.options.tooltip,
                                series:scope.currentSharesVolumeHealthBeauties.series,
                                title:scope.currentSharesVolumeHealthBeauties.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentSharesValueHealthBeauties',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentSharesValueHealthBeauties').empty();
                        var draw=function(){
                            $('#currentSharesValueHealthBeauties').highcharts({
                                xAxis:scope.currentSharesValueHealthBeauties.options.xAxis,
                                yAxis:scope.currentSharesValueHealthBeauties.options.yAxis,
                                tooltip:scope.currentSharesValueHealthBeauties.options.tooltip,
                                series:scope.currentSharesValueHealthBeauties.series,
                                title:scope.currentSharesValueHealthBeauties.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentOperatingProfits',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentOperatingProfits').empty();
                        var draw=function(){
                            $('#currentOperatingProfits').highcharts({
                                xAxis:scope.currentOperatingProfits.options.xAxis,
                                yAxis:scope.currentOperatingProfits.options.yAxis,
                                tooltip:scope.currentOperatingProfits.options.tooltip,
                                series:scope.currentOperatingProfits.series,
                                title:scope.currentOperatingProfits.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentOperatingProfitMargins',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentOperatingProfitMargins').empty();
                        var draw=function(){
                            $('#currentOperatingProfitMargins').highcharts({
                                xAxis:scope.currentOperatingProfitMargins.options.xAxis,
                                yAxis:scope.currentOperatingProfitMargins.options.yAxis,
                                tooltip:scope.currentOperatingProfitMargins.options.tooltip,
                                series:scope.currentOperatingProfitMargins.series,
                                title:scope.currentOperatingProfitMargins.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentNetProfits',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentNetProfits').empty();
                        var draw=function(){
                            $('#currentNetProfits').highcharts({
                                xAxis:scope.currentNetProfits.options.xAxis,
                                yAxis:scope.currentNetProfits.options.yAxis,
                                tooltip:scope.currentNetProfits.options.tooltip,
                                series:scope.currentNetProfits.series,
                                title:scope.currentNetProfits.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        
        .directive('currentNetProfitMargins',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentNetProfitMargins').empty();
                        var draw=function(){
                            $('#currentNetProfitMargins').highcharts({
                                xAxis:scope.currentNetProfitMargins.options.xAxis,
                                yAxis:scope.currentNetProfitMargins.options.yAxis,
                                tooltip:scope.currentNetProfitMargins.options.tooltip,
                                series:scope.currentNetProfitMargins.series,
                                title:scope.currentNetProfitMargins.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('currentShelfSpaceElecssories',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentShelfSpaceElecssories').empty();
                        var draw=function(){
                            $('#currentShelfSpaceElecssories').highcharts({
                                xAxis:scope.currentShelfSpaceElecssories.options.xAxis,
                                yAxis:scope.currentShelfSpaceElecssories.options.yAxis,
                                tooltip:scope.currentShelfSpaceElecssories.options.tooltip,
                                series:scope.currentShelfSpaceElecssories.series,
                                title:scope.currentShelfSpaceElecssories.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('currentShelfSpaceHealthBeauties',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#currentShelfSpaceHealthBeauties').empty();
                        var draw=function(){
                            $('#currentShelfSpaceHealthBeauties').highcharts({
                                xAxis:scope.currentShelfSpaceHealthBeauties.options.xAxis,
                                yAxis:scope.currentShelfSpaceHealthBeauties.options.yAxis,
                                tooltip:scope.currentShelfSpaceHealthBeauties.options.tooltip,
                                series:scope.currentShelfSpaceHealthBeauties.series,
                                title:scope.currentShelfSpaceHealthBeauties.options.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })


        .directive('shopperChart1',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_urbanOnlineShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_urbanOnlineShareOfShoppers').highcharts({
                                xAxis:scope.E_urbanOnlineShareOfShoppers.options.xAxis,
                                yAxis:scope.E_urbanOnlineShareOfShoppers.options.yAxis,
                                tooltip:scope.E_urbanOnlineShareOfShoppers.options.tooltip,
                                series:scope.E_urbanOnlineShareOfShoppers.series,
                                title:scope.E_urbanOnlineShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart2',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_urbanBMShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_urbanBMShareOfShoppers').highcharts({
                                xAxis:scope.E_urbanBMShareOfShoppers.options.xAxis,
                                yAxis:scope.E_urbanBMShareOfShoppers.options.yAxis,
                                tooltip:scope.E_urbanBMShareOfShoppers.options.tooltip,
                                series:scope.E_urbanBMShareOfShoppers.series,
                                title:scope.E_urbanBMShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart3',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_urbanMixedShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_urbanMixedShareOfShoppers').highcharts({
                                xAxis:scope.E_urbanMixedShareOfShoppers.options.xAxis,
                                yAxis:scope.E_urbanMixedShareOfShoppers.options.yAxis,
                                tooltip:scope.E_urbanMixedShareOfShoppers.options.tooltip,
                                series:scope.E_urbanMixedShareOfShoppers.series,
                                title:scope.E_urbanMixedShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart4',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_urbanTotalShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_urbanTotalShareOfShoppers').highcharts({
                                xAxis:scope.E_urbanTotalShareOfShoppers.options.xAxis,
                                yAxis:scope.E_urbanTotalShareOfShoppers.options.yAxis,
                                tooltip:scope.E_urbanTotalShareOfShoppers.options.tooltip,
                                series:scope.E_urbanTotalShareOfShoppers.series,
                                title:scope.E_urbanTotalShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('shopperChart5',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_ruralOnlineShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_ruralOnlineShareOfShoppers').highcharts({
                                xAxis:scope.E_ruralOnlineShareOfShoppers.options.xAxis,
                                yAxis:scope.E_ruralOnlineShareOfShoppers.options.yAxis,
                                tooltip:scope.E_ruralOnlineShareOfShoppers.options.tooltip,
                                series:scope.E_ruralOnlineShareOfShoppers.series,
                                title:scope.E_ruralOnlineShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart6',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_ruralBMShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_ruralBMShareOfShoppers').highcharts({
                                xAxis:scope.E_ruralBMShareOfShoppers.options.xAxis,
                                yAxis:scope.E_ruralBMShareOfShoppers.options.yAxis,
                                tooltip:scope.E_ruralBMShareOfShoppers.options.tooltip,
                                series:scope.E_ruralBMShareOfShoppers.series,
                                title:scope.E_ruralBMShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart7',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_ruralMixedShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_ruralMixedShareOfShoppers').highcharts({
                                xAxis:scope.E_ruralMixedShareOfShoppers.options.xAxis,
                                yAxis:scope.E_ruralMixedShareOfShoppers.options.yAxis,
                                tooltip:scope.E_ruralMixedShareOfShoppers.options.tooltip,
                                series:scope.E_ruralMixedShareOfShoppers.series,
                                title:scope.E_ruralMixedShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart8',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#E_ruralTotalShareOfShoppers').empty();
                        var draw=function(){
                            $('#E_ruralTotalShareOfShoppers').highcharts({
                                xAxis:scope.E_ruralTotalShareOfShoppers.options.xAxis,
                                yAxis:scope.E_ruralTotalShareOfShoppers.options.yAxis,
                                tooltip:scope.E_ruralTotalShareOfShoppers.options.tooltip,
                                series:scope.E_ruralTotalShareOfShoppers.series,
                                title:scope.E_ruralTotalShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('shopperChart9',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_urbanOnlineShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_urbanOnlineShareOfShoppers').highcharts({
                                xAxis:scope.H_urbanOnlineShareOfShoppers.options.xAxis,
                                yAxis:scope.H_urbanOnlineShareOfShoppers.options.yAxis,
                                tooltip:scope.H_urbanOnlineShareOfShoppers.options.tooltip,
                                series:scope.H_urbanOnlineShareOfShoppers.series,
                                title:scope.H_urbanOnlineShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart10',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_urbanBMShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_urbanBMShareOfShoppers').highcharts({
                                xAxis:scope.H_urbanBMShareOfShoppers.options.xAxis,
                                yAxis:scope.H_urbanBMShareOfShoppers.options.yAxis,
                                tooltip:scope.H_urbanBMShareOfShoppers.options.tooltip,
                                series:scope.H_urbanBMShareOfShoppers.series,
                                title:scope.H_urbanBMShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart11',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_urbanMixedShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_urbanMixedShareOfShoppers').highcharts({
                                xAxis:scope.H_urbanMixedShareOfShoppers.options.xAxis,
                                yAxis:scope.H_urbanMixedShareOfShoppers.options.yAxis,
                                tooltip:scope.H_urbanMixedShareOfShoppers.options.tooltip,
                                series:scope.H_urbanMixedShareOfShoppers.series,
                                title:scope.H_urbanMixedShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart12',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_urbanTotalShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_urbanTotalShareOfShoppers').highcharts({
                                xAxis:scope.H_urbanTotalShareOfShoppers.options.xAxis,
                                yAxis:scope.H_urbanTotalShareOfShoppers.options.yAxis,
                                tooltip:scope.H_urbanTotalShareOfShoppers.options.tooltip,
                                series:scope.H_urbanTotalShareOfShoppers.series,
                                title:scope.H_urbanTotalShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('shopperChart13',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_ruralOnlineShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_ruralOnlineShareOfShoppers').highcharts({
                                xAxis:scope.H_ruralOnlineShareOfShoppers.options.xAxis,
                                yAxis:scope.H_ruralOnlineShareOfShoppers.options.yAxis,
                                tooltip:scope.H_ruralOnlineShareOfShoppers.options.tooltip,
                                series:scope.H_ruralOnlineShareOfShoppers.series,
                                title:scope.H_ruralOnlineShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart14',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_ruralBMShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_ruralBMShareOfShoppers').highcharts({
                                xAxis:scope.H_ruralBMShareOfShoppers.options.xAxis,
                                yAxis:scope.H_ruralBMShareOfShoppers.options.yAxis,
                                tooltip:scope.H_ruralBMShareOfShoppers.options.tooltip,
                                series:scope.H_ruralBMShareOfShoppers.series,
                                title:scope.H_ruralBMShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart15',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_ruralMixedShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_ruralMixedShareOfShoppers').highcharts({
                                xAxis:scope.H_ruralMixedShareOfShoppers.options.xAxis,
                                yAxis:scope.H_ruralMixedShareOfShoppers.options.yAxis,
                                tooltip:scope.H_ruralMixedShareOfShoppers.options.tooltip,
                                series:scope.H_ruralMixedShareOfShoppers.series,
                                title:scope.H_ruralMixedShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('shopperChart16',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#H_ruralTotalShareOfShoppers').empty();
                        var draw=function(){
                            $('#H_ruralTotalShareOfShoppers').highcharts({
                                xAxis:scope.H_ruralTotalShareOfShoppers.options.xAxis,
                                yAxis:scope.H_ruralTotalShareOfShoppers.options.yAxis,
                                tooltip:scope.H_ruralTotalShareOfShoppers.options.tooltip,
                                series:scope.H_ruralTotalShareOfShoppers.series,
                                title:scope.H_ruralTotalShareOfShoppers.title,
                                legend: {enabled: true},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('priceSensitiveSerie1',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#priceSensitiveSerie1').empty();
                        var draw=function(){
                            $('#priceSensitiveSerie1').highcharts({
                                xAxis:scope.priceSensitiveSerie1Config.options.xAxis,
                                yAxis:scope.priceSensitiveSerie1Config.options.yAxis,
                                tooltip:scope.priceSensitiveSerie1Config.options.tooltip,
                                series:scope.priceSensitiveSerie1Config.series,
                                title:scope.priceSensitiveSerie1Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('valueSerie1',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#valueSerie1').empty();
                        var draw=function(){
                            $('#valueSerie1').highcharts({
                                xAxis:scope.valueSerie1Config.options.xAxis,
                                yAxis:scope.valueSerie1Config.options.yAxis,
                                tooltip:scope.valueSerie1Config.options.tooltip,
                                series:scope.valueSerie1Config.series,
                                title:scope.valueSerie1Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('fashionSerie1',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#fashionSerie1').empty();
                        var draw=function(){
                            $('#fashionSerie1').highcharts({
                                xAxis:scope.fashionSerie1Config.options.xAxis,
                                yAxis:scope.fashionSerie1Config.options.yAxis,
                                tooltip:scope.fashionSerie1Config.options.tooltip,
                                series:scope.fashionSerie1Config.series,
                                title:scope.fashionSerie1Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('freaksSerie1',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#freaksSerie1').empty();
                        var draw=function(){
                            $('#freaksSerie1').highcharts({
                                xAxis:scope.freaksSerie1Config.options.xAxis,
                                yAxis:scope.freaksSerie1Config.options.yAxis,
                                tooltip:scope.freaksSerie1Config.options.tooltip,
                                series:scope.freaksSerie1Config.series,
                                title:scope.freaksSerie1Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('priceSensitiveSerie2',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#priceSensitiveSerie2').empty();
                        var draw=function(){
                            $('#priceSensitiveSerie2').highcharts({
                                xAxis:scope.priceSensitiveSerie2Config.options.xAxis,
                                yAxis:scope.priceSensitiveSerie2Config.options.yAxis,
                                tooltip:scope.priceSensitiveSerie2Config.options.tooltip,
                                series:scope.priceSensitiveSerie2Config.series,
                                title:scope.priceSensitiveSerie2Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('valueSerie2',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#valueSerie2').empty();
                        var draw=function(){
                            $('#valueSerie2').highcharts({
                                xAxis:scope.valueSerie2Config.options.xAxis,
                                yAxis:scope.valueSerie2Config.options.yAxis,
                                tooltip:scope.valueSerie2Config.options.tooltip,
                                series:scope.valueSerie2Config.series,
                                title:scope.valueSerie2Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('fashionSerie2',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#fashionSerie2').empty();
                        var draw=function(){
                            $('#fashionSerie2').highcharts({
                                xAxis:scope.fashionSerie2Config.options.xAxis,
                                yAxis:scope.fashionSerie2Config.options.yAxis,
                                tooltip:scope.fashionSerie2Config.options.tooltip,
                                series:scope.fashionSerie2Config.series,
                                title:scope.fashionSerie2Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('freaksSerie2',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#freaksSerie2').empty();
                        var draw=function(){
                            $('#freaksSerie2').highcharts({
                                xAxis:scope.freaksSerie2Config.options.xAxis,
                                yAxis:scope.freaksSerie2Config.options.yAxis,
                                tooltip:scope.freaksSerie2Config.options.tooltip,
                                series:scope.freaksSerie2Config.series,
                                title:scope.freaksSerie2Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('priceSensitiveSerie3',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#priceSensitiveSerie3').empty();
                        var draw=function(){
                            $('#priceSensitiveSerie3').highcharts({
                                xAxis:scope.priceSensitiveSerie3Config.options.xAxis,
                                yAxis:scope.priceSensitiveSerie3Config.options.yAxis,
                                tooltip:scope.priceSensitiveSerie3Config.options.tooltip,
                                series:scope.priceSensitiveSerie3Config.series,
                                title:scope.priceSensitiveSerie3Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('valueSerie3',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#valueSerie3').empty();
                        var draw=function(){
                            $('#valueSerie3').highcharts({
                                xAxis:scope.valueSerie3Config.options.xAxis,
                                yAxis:scope.valueSerie3Config.options.yAxis,
                                tooltip:scope.valueSerie3Config.options.tooltip,
                                series:scope.valueSerie3Config.series,
                                title:scope.valueSerie3Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('fashionSerie3',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#fashionSerie3').empty();
                        var draw=function(){
                            $('#fashionSerie3').highcharts({
                                xAxis:scope.fashionSerie3Config.options.xAxis,
                                yAxis:scope.fashionSerie3Config.options.yAxis,
                                tooltip:scope.fashionSerie3Config.options.tooltip,
                                series:scope.fashionSerie3Config.series,
                                title:scope.fashionSerie3Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('freaksSerie3',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#freaksSerie3').empty();
                        var draw=function(){
                            $('#freaksSerie3').highcharts({
                                xAxis:scope.freaksSerie3Config.options.xAxis,
                                yAxis:scope.freaksSerie3Config.options.yAxis,
                                tooltip:scope.freaksSerie3Config.options.tooltip,
                                series:scope.freaksSerie3Config.series,
                                title:scope.freaksSerie3Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('priceSensitiveSerie4',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#priceSensitiveSerie4').empty();
                        var draw=function(){
                            $('#priceSensitiveSerie4').highcharts({
                                xAxis:scope.priceSensitiveSerie4Config.options.xAxis,
                                yAxis:scope.priceSensitiveSerie4Config.options.yAxis,
                                tooltip:scope.priceSensitiveSerie4Config.options.tooltip,
                                series:scope.priceSensitiveSerie4Config.series,
                                title:scope.priceSensitiveSerie4Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('valueSerie4',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#valueSerie4').empty();
                        var draw=function(){
                            $('#valueSerie4').highcharts({
                                xAxis:scope.valueSerie4Config.options.xAxis,
                                yAxis:scope.valueSerie4Config.options.yAxis,
                                tooltip:scope.valueSerie4Config.options.tooltip,
                                series:scope.valueSerie4Config.series,
                                title:scope.valueSerie4Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('fashionSerie4',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#fashionSerie4').empty();
                        var draw=function(){
                            $('#fashionSerie4').highcharts({
                                xAxis:scope.fashionSerie4Config.options.xAxis,
                                yAxis:scope.fashionSerie4Config.options.yAxis,
                                tooltip:scope.fashionSerie4Config.options.tooltip,
                                series:scope.fashionSerie4Config.series,
                                title:scope.fashionSerie4Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('freaksSerie4',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#freaksSerie4').empty();
                        var draw=function(){
                            $('#freaksSerie4').highcharts({
                                xAxis:scope.freaksSerie4Config.options.xAxis,
                                yAxis:scope.freaksSerie4Config.options.yAxis,
                                tooltip:scope.freaksSerie4Config.options.tooltip,
                                series:scope.freaksSerie4Config.series,
                                title:scope.freaksSerie4Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('priceSensitiveSerie5',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#priceSensitiveSerie5').empty();
                        var draw=function(){
                            $('#priceSensitiveSerie5').highcharts({
                                xAxis:scope.priceSensitiveSerie5Config.options.xAxis,
                                yAxis:scope.priceSensitiveSerie5Config.options.yAxis,
                                tooltip:scope.priceSensitiveSerie5Config.options.tooltip,
                                series:scope.priceSensitiveSerie5Config.series,
                                title:scope.priceSensitiveSerie5Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('valueSerie5',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#valueSerie5').empty();
                        var draw=function(){
                            $('#valueSerie5').highcharts({
                                xAxis:scope.valueSerie5Config.options.xAxis,
                                yAxis:scope.valueSerie5Config.options.yAxis,
                                tooltip:scope.valueSerie5Config.options.tooltip,
                                series:scope.valueSerie5Config.series,
                                title:scope.valueSerie5Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('fashionSerie5',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#fashionSerie5').empty();
                        var draw=function(){
                            $('#fashionSerie5').highcharts({
                                xAxis:scope.fashionSerie5Config.options.xAxis,
                                yAxis:scope.fashionSerie5Config.options.yAxis,
                                tooltip:scope.fashionSerie5Config.options.tooltip,
                                series:scope.fashionSerie5Config.series,
                                title:scope.fashionSerie5Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('freaksSerie5',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#freaksSerie5').empty();
                        var draw=function(){
                            $('#freaksSerie5').highcharts({
                                xAxis:scope.freaksSerie5Config.options.xAxis,
                                yAxis:scope.freaksSerie5Config.options.yAxis,
                                tooltip:scope.freaksSerie5Config.options.tooltip,
                                series:scope.freaksSerie5Config.series,
                                title:scope.freaksSerie5Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })

        .directive('priceSensitiveSerie6',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#priceSensitiveSerie6').empty();
                        var draw=function(){
                            $('#priceSensitiveSerie6').highcharts({
                                xAxis:scope.priceSensitiveSerie6Config.options.xAxis,
                                yAxis:scope.priceSensitiveSerie6Config.options.yAxis,
                                tooltip:scope.priceSensitiveSerie6Config.options.tooltip,
                                series:scope.priceSensitiveSerie6Config.series,
                                title:scope.priceSensitiveSerie6Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('valueSerie6',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#valueSerie6').empty();
                        var draw=function(){
                            $('#valueSerie6').highcharts({
                                xAxis:scope.valueSerie6Config.options.xAxis,
                                yAxis:scope.valueSerie6Config.options.yAxis,
                                tooltip:scope.valueSerie6Config.options.tooltip,
                                series:scope.valueSerie6Config.series,
                                title:scope.valueSerie6Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('fashionSerie6',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#fashionSerie6').empty();
                        var draw=function(){
                            $('#fashionSerie6').highcharts({
                                xAxis:scope.fashionSerie6Config.options.xAxis,
                                yAxis:scope.fashionSerie6Config.options.yAxis,
                                tooltip:scope.fashionSerie6Config.options.tooltip,
                                series:scope.fashionSerie6Config.series,
                                title:scope.fashionSerie6Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
        .directive('freaksSerie6',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(v){
                    if(v != undefined){
                        $('#freaksSerie6').empty();
                        var draw=function(){
                            $('#freaksSerie6').highcharts({
                                xAxis:scope.freaksSerie6Config.options.xAxis,
                                yAxis:scope.freaksSerie6Config.options.yAxis,
                                tooltip:scope.freaksSerie6Config.options.tooltip,
                                series:scope.freaksSerie6Config.series,
                                title:scope.freaksSerie6Config.title,
                                plotOptions: { series: { dataLabels: { enabled: true, useHTML: true,/*rotation:-90,*/formatter: function() {var result = '';for (var i = 0; i < this.key.length; i++) {result = result + this.key.substring(i, i + 1) + '<br>';}return result;/*return this.key;*/},style: {color: 'white',fontSize: '12px',fontWeight: "normal",lineHeight: '12px'}}},column: {stacking: 'normal'}},
                                legend: {enabled: false},
                                credits: {enabled: false}
                            })
                        }
                        setTimeout(draw,100);
                    }
                })
            }
        })
    



        .directive('ruralElecssoriesBrand1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart1') != undefined) {
                        $('#highchart1').empty();
                        $('#highchart1').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                title: {
                                    text: scope.xTitle1
                                }
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle1
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries1
                        });
                    }
                });
            }
        })
        .directive('ruralElecssoriesBrand2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart2') != undefined) {
                        $('#highchart2').empty();
                        $('#highchart2').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: ['','','','','','']
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle2
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries2
                        });
                    }
                });
            }
        })
        .directive('urbanElecssoriesBrand1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart3') != undefined) {
                        $('#highchart3').empty();
                        $('#highchart3').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                title: {
                                    text: scope.xTitle1
                                }
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle1
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries1
                        });
                    }

                });
            }
        })
        .directive('urbanElecssoriesBrand2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart4') != undefined) {
                        $('#highchart4').empty();
                        $('#highchart4').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: ['','','','','','']
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle2
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries2
                        });
                    }
                });
            }
        })
        .directive('ruralHealthBeautiesBrand1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart5') != undefined) {
                        $('#highchart5').empty();
                        $('#highchart5').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                title: {
                                    text: scope.xTitle1
                                }
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle1
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries1
                        });
                    }
                });
            }
        })
        .directive('ruralHealthBeautiesBrand2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart6') != undefined) {
                        $('#highchart6').empty();
                        $('#highchart6').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: ['','','','','','']
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle2
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries2
                        });
                    }
                });
            }
        })
        .directive('urbanHealthBeautiesBrand1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart7') != undefined) {
                        $('#highchart7').empty();
                        $('#highchart7').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                title: {
                                    text: scope.xTitle1
                                }
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle1
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries1
                        });
                    }
                });
            }
        })
        .directive('urbanHealthBeautiesBrand2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart8') != undefined) {
                        $('#highchart8').empty();
                        $('#highchart8').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: ['','','','','','']
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle2
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 20,
                                    maxSize: 20
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s = '<p>' + this.point.z + '</p>' + '<p>(' + this.point.y.toFixed(2) + ')</p>';
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.mySeries2
                        });
                    }

                });
            }
        })
        .directive('retailerPerceptions1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart9') != undefined) {
                        $('#highchart9').empty();
                        $('#highchart9').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: scope.ruralTitle
                            },
                            xAxis: {
                                title: {
                                    text: scope.xTitle3
                                }
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle3
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 15,
                                    maxSize: 50
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    if (this.point.z == 10) {
                                        var s = '<p>' + this.series.name + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    } else {
                                        var s = '<p>' + scope.previousInfo + '</p><p>' + this.series.name + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    }
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.retailerPerceptionsSeries1
                        });
                    }

                });
            }
        })
        .directive('retailerPerceptions2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#highchart10') != undefined) {
                        $('#highchart10').empty();
                        $('#highchart10').highcharts({
                            chart: {
                                type: 'bubble',
                                zoomType: 'xy'
                            },
                            title: {
                                text: scope.urbanTitle
                            },
                            xAxis: {
                                title: {
                                    text: scope.xTitle3
                                }
                            },
                            yAxis: {
                                title: {
                                    text: scope.yTitle3
                                }
                            },
                            plotOptions: {
                                bubble: {
                                    minSize: 15,
                                    maxSize: 50
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    if (this.point.z == 10) {
                                        var s = '<p>' + this.series.name + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    } else {
                                        var s = '<p>' + scope.previousInfo + '</p><p>' + this.series.name + '</p>' + '<p>(' + this.point.x.toFixed(2) + ',' + this.point.y.toFixed(2) + ')</p>';
                                    }
                                    return s;
                                },
                                shared: false,
                                useHTML: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.retailerPerceptionsSeries2
                        });
                    }

                });
            }
        })
        .directive('forecastsConsumer1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment1') != undefined) {
                        $('#segment1').empty();
                        $('#segment1').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title1
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsConsumerSeries1
                        });
                    }

                });
            }
        })
        .directive('forecastsConsumer2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment2') != undefined) {
                        $('#segment2').empty();
                        $('#segment2').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title2
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsConsumerSeries2
                        });
                    }

                });
            }
        })
        .directive('forecastsConsumer3', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment3') != undefined) {
                        $('#segment3').empty();
                        $('#segment3').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title3
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsConsumerSeries3
                        });
                    }

                });
            }
        })
        .directive('forecastsConsumer4', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment4') != undefined) {
                        $('#segment4').empty();
                        $('#segment4').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title4
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsConsumerSeries4
                        });
                    }

                });
            }
        })
        .directive('forecastsShopper1', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment5') != undefined) {
                        $('#segment5').empty();
                        $('#segment5').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title1
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsShopperSeries1
                        });
                    }
                });
            }
        })
        .directive('forecastsShopper2', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment6') != undefined) {
                        $('#segment6').empty();
                        $('#segment6').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title2
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsShopperSeries2
                        });
                    }

                });
            }
        })
        .directive('forecastsShopper3', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment7') != undefined) {
                        $('#segment7').empty();
                        $('#segment7').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title3
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsShopperSeries3
                        });
                    }

                });
            }
        })
        .directive('forecastsShopper4', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#segment8') != undefined) {
                        $('#segment8').empty();
                        $('#segment8').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: scope.title4
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastsShopperSeries4
                        });
                    }

                });
            }
        })
        .directive('forecastCategory', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#forecastCategory') != undefined) {
                        $('#forecastCategory').empty();
                        $('#forecastCategory').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastCategorySeries
                        });
                    }

                });
            }
        })
        .directive('forecastInternet', function() {
            return function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(v) {
                    if ($('#forecastInternet') != undefined) {
                        $('#forecastInternet').empty();
                        $('#forecastInternet').highcharts({
                            chart: {
                                type: 'arearange',
                                zoomType: 'x'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                title: {
                                    text: scope.segmentXTitle
                                },
                                categories: scope.categories
                            },
                            yAxis: {
                                title: {
                                    text: scope.segmentYTitle
                                }

                            },
                            tooltip: {
                                crosshairs: true,
                                valueDecimals: 2
                            },
                            credits: {
                                enabled: false
                            },
                            series: scope.forecastInternetSeries
                        });
                    }

                });
            }
        })
        .directive('wizard', function() {
            return function(scope, elem, attrs) {
                $("#wizard").steps({
                    headerTag: "h2",
                    bodyTag: "section",
                    transitionEffect: "slideLeft"
                });
            }
        })
        .directive('supplierClockChart',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(newValue,oldValue){
                    if(newValue!=oldValue){
                        if($('#supplierClockChart')!=undefined){
                            $('#supplierClockChart').empty();
                            $('#supplierClockChart').highcharts({
                                chart: {
                                    type: 'pie',
                                    height:200,
                                    width:200
                                },
                                title: {
                                    text: '',
                                },
                                credits: {
                                    enabled: false
                                },
                                tooltip: {
                                    enabled: true,
                                    formatter: function() {
                                        if(this.key!="Gone"&&this.key!="历时"){
                                            return this.key+'<br/>'+'Left Time:'+this.y+'mins';
                                        }else{
                                            return 'Time gone:'+this.y+'mins';
                                        }
                                    }
                                },
                                plotOptions: {
                                    pie: {
                                        borderColor: null,
                                        innerSize: '70%',
                                         dataLabels: {
                                             enabled: false,
                                         }
                                    },
                                    series: {
                                        animation: {
                                            duration: 0,
                                        }
                                    }
                                },
                                series: scope.supplierChartSeries
                            })
                        }
                    }
                });
            }
        })
        .directive('retailerClockChart',function(){
            return function(scope,elem,attrs){
                scope.$watch(attrs.ngModel,function(newValue,oldValue){
                    if(newValue!=oldValue){
                        if($('#retailerClockChart')!=undefined){
                            $('#retailerClockChart').empty();
                            $('#retailerClockChart').highcharts({
                                chart: {
                                    type: 'pie',
                                    height:200,
                                    width:200
                                },
                                title: {
                                    text: '',
                                },
                                credits: {
                                    enabled: false
                                },
                                tooltip: {
                                    enabled: true,
                                    formatter: function() {
                                        if(this.key!="Gone"&&this.key!="历时"){
                                            return this.key+'<br/>'+'Left Time:'+this.y+'mins';
                                        }else{
                                            return 'Time gone:'+this.y+'mins';
                                        }
                                    }
                                },
                                plotOptions: {
                                    pie: {
                                        borderColor: null,
                                        innerSize: '70%',
                                         dataLabels: {
                                             enabled: false,
                                         }
                                    },
                                    series: {
                                        animation: {
                                            duration: 0,
                                        }
                                    }
                                },
                                series: scope.retailerChartSeries
                            })
                        }
                    }
                });
            }
        })

})