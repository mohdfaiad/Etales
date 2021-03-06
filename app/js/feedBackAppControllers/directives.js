var app = angular.module('directive', []);
app.provider('Label', function() {
    var currentLanguage,
        labelBase;

    //configure default languge during angular bootstraping
    this.initialiseLanguage = function(value) {
        this.currentLanguage = value;
        this.labelBase = getLabelBase();
    };

    this.$get = function() {
        var self = this,
            item;
        var items = new Array();
        return {
            getContent: function(value) {
                switch (self.currentLanguage) {
                    case 'ENG':
                        item = _.find(self.labelBase, function(singleItem) {
                            return singleItem.id == value
                        });
                        if (item) {
                            return item.ENG;
                        } else {
                            //items.push(value);
                            console.log(item);
                            return '**NotFound**';
                        }
                        break;
                    case 'CHN':
                        item = _.find(self.labelBase, function(singleItem) {
                            return singleItem.id == value
                        })
                        if (item) {
                            return item.CHN;
                        } else return '**NotFound**';
                        break;
                    case 'RUS':
                        item = _.find(self.labelBase, function(singleItem) {
                            return singleItem.id == value
                        })
                        if (item) {
                            return item.RUS;
                        } else return '**NotFound**';
                        break;
                    default:
                        console.log(self.labelBase);
                        return '**NotFound**'
                }
            },
            changeLanguage: function(value) {
                self.currentLanguage = value;
            },
            getCurrentLanguage: function() {
                return self.currentLanguage;
            }
        }
    }
});
app.factory('PlayerColor', function($rootScope) {
    return {
        's1': '#3257A7',
        's2': '#B11E22',
        's3': '#F6B920',
        's4': '#666666',
        'r1': '#8B288B',
        'r2': '#329444',
        'r3': '#00AFEF',
        'bm': '#B11E22',
        'online': '#3257A7',
        'mixed': '#329444',
        'drop': '#B11E22',
        'increase': '#329444',
        'awareness': '#3257A7',
        'price': '#B11E22', //红
        'value': '#F6B920', //黄
        'fashion': '#3257A7', //蓝
        'freaks': '#329444', //绿
        'final_s1': '#D4DCE6',
        'final_s2': '#D69492',
        'final_s3': '#FFF2CC',
        'final_r1': '#DFDAE4',
        'final_r1': '#FCD5B5',

    }
});
app.filter('out', function() {
    return function(item) {
        if (item == 0 || item == 0.00) {
            return 'Out of stock';
        } else {
            return item;
        }
    }
});
app.filter('minus', function() {
    return function(item) {
        if (item == -99 || item == -99.00) {
            return '-';
        } else {
            return item;
        }
    }
})

app.filter('NulltoMinOr1Number', function() {
    return function(item) {
        if (item == 0 || item == -100 || item == undefined) {
            return '-';
        } else if (item < 0.1 && item > 0) {
            return '< 0.1';
        } else {
            return item.toFixed(1);
        }
    }
})
app.filter('NulltoMinOr2Number', function() {
    return function(item) {
        if (item == 0 || item == -100 || item == undefined) {
            return '-';
        } else {
            return item.toFixed(2);
        }
    }
})
app.factory('StaticValues', function($rootScope) {
    return {
        'player': {
            's1': 0,
            's2': 1,
            's3': 2,
            's4': 3,
            'r1': 0,
            'r2': 1,
            'r3': 2,
            'r4': 3
        },
        'playerID': {
            's1': 1,
            's2': 2,
            's3': 3,
            's4': 4,
            'r1': 5,
            'r2': 6,
            'r3': 7,
            'r4': 8
        },
        'retailerID': {
            'r1': 1,
            'r2': 2,
            'r3': 3,
            'r4': 4
        },
        'chartOwner': {
            's1': 0,
            's2': 1,
            's3': 2,
            's4': 3,
            'r1': 4,
            'r2': 5,
            'r3': 6,
            'r4': 7
        },
        'store': {
            'r1': 0,
            'r2': 1,
            'tt': 2,
            's1': 3,
            's2': 4,
            's3': 5,
            's4': 6
        },
        'shopper': {
            'bm': 0,
            'online': 1,
            'mixed': 2,
            'all': 3
        },
        'segment': {
            'price': 0,
            'value': 1,
            'fashion': 2,
            'freaks': 3,
            'total': 4
        },
        'market': {
            'urban': 0,
            'rural': 1,
            'total': 2
        },
        'marketID': {
            'urban': 1,
            'rural': 2,
            'total': 2
        },
        'category': {
            'ele': 0,
            'hea': 1,
            'total': 2
        },
        'categoryID': {
            'ele': 1,
            'hea': 2,
            'total': 3
        },
        'CandV': {
            'eleVolume': 0,
            'eleValue': 1,
            'heaVolume': 2,
            'heaValue': 3
        }, //category and volume or value
        'CandM': {
            'eleUrban': 0,
            'eleRural': 1,
            'heaUrban': 2,
            'heaRural': 3
        }, //category and Market
        'perception': {
            'easy': 0,
            'quality': 1,
            'appeal': 2
        }
    }
});

app.directive('sentimentElecssories', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#sentimentElecssories').empty();
                var draw = function() {
                    $('#sentimentElecssories').highcharts({
                        xAxis: scope.sentimentElecssoriesConfig.options.xAxis,
                        yAxis: scope.sentimentElecssoriesConfig.options.yAxis,
                        tooltip: scope.sentimentElecssoriesConfig.options.tooltip,
                        series: scope.sentimentElecssoriesConfig.series,
                        plotOptions: scope.sentimentElecssoriesConfig.options.plotOptions,
                        title: scope.sentimentElecssoriesConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
});
app.directive('strengthElecssories', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#strengthElecssories').empty();
                var draw = function() {
                    $('#strengthElecssories').highcharts({
                        xAxis: scope.strengthElecssoriesConfig.options.xAxis,
                        yAxis: scope.strengthElecssoriesConfig.options.yAxis,
                        tooltip: scope.strengthElecssoriesConfig.options.tooltip,
                        series: scope.strengthElecssoriesConfig.series,
                        title: scope.strengthElecssoriesConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})
app.directive('sentimentHealthBeauties', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#sentimentHealthBeauties').empty();
                var draw = function() {
                    $('#sentimentHealthBeauties').highcharts({
                        xAxis: scope.sentimentHealthBeautiesConfig.options.xAxis,
                        yAxis: scope.sentimentHealthBeautiesConfig.options.yAxis,
                        tooltip: scope.sentimentHealthBeautiesConfig.options.tooltip,
                        series: scope.sentimentHealthBeautiesConfig.series,
                        plotOptions: scope.sentimentHealthBeautiesConfig.options.plotOptions,
                        title: scope.sentimentHealthBeautiesConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})
app.directive('strengthHealthBeauties', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#strengthHealthBeauties').empty();
                var draw = function() {
                    $('#strengthHealthBeauties').highcharts({
                        xAxis: scope.strengthHealthBeautiesConfig.options.xAxis,
                        yAxis: scope.strengthHealthBeautiesConfig.options.yAxis,
                        tooltip: scope.strengthHealthBeautiesConfig.options.tooltip,
                        series: scope.strengthHealthBeautiesConfig.series,
                        title: scope.strengthHealthBeautiesConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})
app.directive('playerSentiment', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#playerSentiment').empty();
                var draw = function() {
                    $('#playerSentiment').highcharts({
                        xAxis: scope.playerSentimentConfig.options.xAxis,
                        yAxis: scope.playerSentimentConfig.options.yAxis,
                        tooltip: scope.playerSentimentConfig.options.tooltip,
                        series: scope.playerSentimentConfig.series,
                        plotOptions: scope.playerSentimentConfig.options.plotOptions,
                        title: scope.playerSentimentConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
});
app.directive('playerStrength', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#playerStrength').empty();
                var draw = function() {
                    $('#playerStrength').highcharts({
                        xAxis: scope.playerStrengthConfig.options.xAxis,
                        yAxis: scope.playerStrengthConfig.options.yAxis,
                        tooltip: scope.playerStrengthConfig.options.tooltip,
                        series: scope.playerStrengthConfig.series,
                        title: scope.playerStrengthConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
});

app.directive('feedbackEleUrban', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(newValue) {
            if (newValue != undefined) {

                var charts = [];

                //根据角标动态判断是显示还是隐藏每一个图表内对应series的数据
                function toggleSeries(i) {
                    var li = $('#feedBackEleUrbanLegend li:eq(' + i + ')').toggleClass('hidden'),
                        hidden = li.hasClass('hidden');
                    //遍历所有图表对象
                    for (var serie, c = 0; c < charts.length; c++) {
                        serie = charts[c].series[i];
                        serie[hidden ? 'hide' : 'show']();
                    }
                }
                charts[0] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart50',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_urbanOnlineShareOfShoppers.options.xAxis,
                    yAxis: scope.E_urbanOnlineShareOfShoppers.options.yAxis,
                    tooltip: scope.E_urbanOnlineShareOfShoppers.options.tooltip,
                    series: scope.E_urbanOnlineShareOfShoppers.series,
                    title: scope.E_urbanOnlineShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }, function(chart) {
                    var $legend = $('#feedBackEleUrbanLegend');
                    //动态渲染图例且给每一个li对象绑定click点击事件
                    for (i = 0; i < chart.series.length; i++) {
                        (function(serie, i, $legend) {
                            $('<li>')
                                .css('color', serie.color)
                                .append('<span class="circle" style="background-color:' + serie.color + ';">&nbsp;</span>')
                                .append(serie.name)
                                .click(function() {
                                    toggleSeries(i);
                                })
                                .appendTo($legend);
                        })(chart.series[i], i, $legend);
                    }
                });
                charts[1] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart51',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_urbanBMShareOfShoppers.options.xAxis,
                    yAxis: scope.E_urbanBMShareOfShoppers.options.yAxis,
                    tooltip: scope.E_urbanBMShareOfShoppers.options.tooltip,
                    series: scope.E_urbanBMShareOfShoppers.series,
                    title: scope.E_urbanBMShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[2] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart52',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_urbanMixedShareOfShoppers.options.xAxis,
                    yAxis: scope.E_urbanMixedShareOfShoppers.options.yAxis,
                    tooltip: scope.E_urbanMixedShareOfShoppers.options.tooltip,
                    series: scope.E_urbanMixedShareOfShoppers.series,
                    title: scope.E_urbanMixedShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[3] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart53',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_urbanTotalShareOfShoppers.options.xAxis,
                    yAxis: scope.E_urbanTotalShareOfShoppers.options.yAxis,
                    tooltip: scope.E_urbanTotalShareOfShoppers.options.tooltip,
                    series: scope.E_urbanTotalShareOfShoppers.series,
                    title: scope.E_urbanTotalShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });

                $('.feedbackEleUrbanChart').bind('mousedown', function() {

                    $($(this).siblings()).toggle();

                    $(this).toggleClass('modal-chart');

                    $(this).highcharts().reflow();
                });


            }

        });
    }
});
app.directive('feedbackEleRural', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(newValue) {
            if (newValue != undefined) {

                var charts = [];

                //根据角标动态判断是显示还是隐藏每一个图表内对应series的数据
                function toggleSeries(i) {
                    var li = $('#feedBackEleRuralLegend li:eq(' + i + ')').toggleClass('hidden'),
                        hidden = li.hasClass('hidden');
                    //遍历所有图表对象
                    for (var serie, c = 0; c < charts.length; c++) {
                        serie = charts[c].series[i];
                        serie[hidden ? 'hide' : 'show']();
                    }
                }
                charts[0] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart54',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_ruralOnlineShareOfShoppers.options.xAxis,
                    yAxis: scope.E_ruralOnlineShareOfShoppers.options.yAxis,
                    tooltip: scope.E_ruralOnlineShareOfShoppers.options.tooltip,
                    series: scope.E_ruralOnlineShareOfShoppers.series,
                    title: scope.E_ruralOnlineShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }, function(chart) {
                    var $legend = $('#feedBackEleRuralLegend');
                    //动态渲染图例且给每一个li对象绑定click点击事件
                    for (i = 0; i < chart.series.length; i++) {
                        (function(serie, i, $legend) {
                            $('<li>')
                                .css('color', serie.color)
                                .append('<span class="circle" style="background-color:' + serie.color + ';">&nbsp;</span>')
                                .append(serie.name)
                                .click(function() {
                                    toggleSeries(i);
                                })
                                .appendTo($legend);
                        })(chart.series[i], i, $legend);
                    }
                });
                charts[1] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart55',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_ruralBMShareOfShoppers.options.xAxis,
                    yAxis: scope.E_ruralBMShareOfShoppers.options.yAxis,
                    tooltip: scope.E_ruralBMShareOfShoppers.options.tooltip,
                    series: scope.E_ruralBMShareOfShoppers.series,
                    title: scope.E_ruralBMShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[2] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart56',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_ruralMixedShareOfShoppers.options.xAxis,
                    yAxis: scope.E_ruralMixedShareOfShoppers.options.yAxis,
                    tooltip: scope.E_ruralMixedShareOfShoppers.options.tooltip,
                    series: scope.E_ruralMixedShareOfShoppers.series,
                    title: scope.E_ruralMixedShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[3] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart57',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.E_ruralTotalShareOfShoppers.options.xAxis,
                    yAxis: scope.E_ruralTotalShareOfShoppers.options.yAxis,
                    tooltip: scope.E_ruralTotalShareOfShoppers.options.tooltip,
                    series: scope.E_ruralTotalShareOfShoppers.series,
                    title: scope.E_ruralTotalShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });

                $('.feedbackEleRuralChart').bind('mousedown', function() {

                    $($(this).siblings()).toggle();

                    $(this).toggleClass('modal-chart');

                    $(this).highcharts().reflow();
                });
            }

        });
    }
});
app.directive('feedbackHeaUrban', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(newValue) {
            if (newValue != undefined) {

                var charts = [];

                //根据角标动态判断是显示还是隐藏每一个图表内对应series的数据
                function toggleSeries(i) {
                    var li = $('#feedBackHeaUrbanLegend li:eq(' + i + ')').toggleClass('hidden'),
                        hidden = li.hasClass('hidden');
                    //遍历所有图表对象
                    for (var serie, c = 0; c < charts.length; c++) {
                        serie = charts[c].series[i];
                        serie[hidden ? 'hide' : 'show']();
                    }
                }
                charts[0] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart58',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_urbanOnlineShareOfShoppers.options.xAxis,
                    yAxis: scope.H_urbanOnlineShareOfShoppers.options.yAxis,
                    tooltip: scope.H_urbanOnlineShareOfShoppers.options.tooltip,
                    series: scope.H_urbanOnlineShareOfShoppers.series,
                    title: scope.H_urbanOnlineShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }, function(chart) {
                    var $legend = $('#feedBackHeaUrbanLegend');
                    //动态渲染图例且给每一个li对象绑定click点击事件
                    for (i = 0; i < chart.series.length; i++) {
                        (function(serie, i, $legend) {
                            $('<li>')
                                .css('color', serie.color)
                                .append('<span class="circle" style="background-color:' + serie.color + ';">&nbsp;</span>')
                                .append(serie.name)
                                .click(function() {
                                    toggleSeries(i);
                                })
                                .appendTo($legend);
                        })(chart.series[i], i, $legend);
                    }
                });
                charts[1] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart59',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_urbanBMShareOfShoppers.options.xAxis,
                    yAxis: scope.H_urbanBMShareOfShoppers.options.yAxis,
                    tooltip: scope.H_urbanBMShareOfShoppers.options.tooltip,
                    series: scope.H_urbanBMShareOfShoppers.series,
                    title: scope.H_urbanBMShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[2] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart60',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_urbanMixedShareOfShoppers.options.xAxis,
                    yAxis: scope.H_urbanMixedShareOfShoppers.options.yAxis,
                    tooltip: scope.H_urbanMixedShareOfShoppers.options.tooltip,
                    series: scope.H_urbanMixedShareOfShoppers.series,
                    title: scope.H_urbanMixedShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[3] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart61',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_urbanTotalShareOfShoppers.options.xAxis,
                    yAxis: scope.H_urbanTotalShareOfShoppers.options.yAxis,
                    tooltip: scope.H_urbanTotalShareOfShoppers.options.tooltip,
                    series: scope.H_urbanTotalShareOfShoppers.series,
                    title: scope.H_urbanTotalShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });

                $('.feedbackHeaUrbanChart').bind('mousedown', function() {

                    $($(this).siblings()).toggle();

                    $(this).toggleClass('modal-chart');

                    $(this).highcharts().reflow();
                });
            }

        });
    }
});
app.directive('feedbackHeaRural', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(newValue) {
            if (newValue != undefined) {

                var charts = [];

                //根据角标动态判断是显示还是隐藏每一个图表内对应series的数据
                function toggleSeries(i) {
                    var li = $('#feedBackHeaRuralLegend li:eq(' + i + ')').toggleClass('hidden'),
                        hidden = li.hasClass('hidden');
                    //遍历所有图表对象
                    for (var serie, c = 0; c < charts.length; c++) {
                        serie = charts[c].series[i];
                        serie[hidden ? 'hide' : 'show']();
                    }
                }
                charts[0] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart62',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_ruralOnlineShareOfShoppers.options.xAxis,
                    yAxis: scope.H_ruralOnlineShareOfShoppers.options.yAxis,
                    tooltip: scope.H_ruralOnlineShareOfShoppers.options.tooltip,
                    series: scope.H_ruralOnlineShareOfShoppers.series,
                    title: scope.H_ruralOnlineShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }, function(chart) {
                    var $legend = $('#feedBackHeaRuralLegend');
                    //动态渲染图例且给每一个li对象绑定click点击事件
                    for (i = 0; i < chart.series.length; i++) {
                        (function(serie, i, $legend) {
                            $('<li>')
                                .css('color', serie.color)
                                .append('<span class="circle" style="background-color:' + serie.color + ';">&nbsp;</span>')
                                .append(serie.name)
                                .click(function() {
                                    toggleSeries(i);
                                })
                                .appendTo($legend);
                        })(chart.series[i], i, $legend);
                    }
                });
                charts[1] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart63',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_ruralBMShareOfShoppers.options.xAxis,
                    yAxis: scope.H_ruralBMShareOfShoppers.options.yAxis,
                    tooltip: scope.H_ruralBMShareOfShoppers.options.tooltip,
                    series: scope.H_ruralBMShareOfShoppers.series,
                    title: scope.H_ruralBMShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[2] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart64',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_ruralMixedShareOfShoppers.options.xAxis,
                    yAxis: scope.H_ruralMixedShareOfShoppers.options.yAxis,
                    tooltip: scope.H_ruralMixedShareOfShoppers.options.tooltip,
                    series: scope.H_ruralMixedShareOfShoppers.series,
                    title: scope.H_ruralMixedShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[3] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart65',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.H_ruralTotalShareOfShoppers.options.xAxis,
                    yAxis: scope.H_ruralTotalShareOfShoppers.options.yAxis,
                    tooltip: scope.H_ruralTotalShareOfShoppers.options.tooltip,
                    series: scope.H_ruralTotalShareOfShoppers.series,
                    title: scope.H_ruralTotalShareOfShoppers.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });

                $('.feedbackHeaRuralChart').bind('mousedown', function() {

                    $($(this).siblings()).toggle();

                    $(this).toggleClass('modal-chart');

                    $(this).highcharts().reflow();
                });
            }

        });
    }
});
app.directive('retailerPerceptions1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.perception != undefined) {
                $('#chart11').empty();
                $('#chart11').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
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
                    series: scope.perception.retailerPerceptionsSeries1
                });
            }

        });
    }
})
app.directive('retailerPerceptions2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.perception != undefined) {
                $('#chart12').empty();
                $('#chart12').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
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
                    series: scope.perception.retailerPerceptionsSeries2
                });
            }

        });
    }
})
app.directive('retailerServiceLevel1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.serviceLevels != undefined) {
                $('#chart21').empty();
                Highcharts.wrap(Highcharts.seriesTypes.bubble.prototype, 'translate', function(proceed) {
                    proceed.call(this);
                    Highcharts.each(this.data, function(point) {
                        point.shapeType = 'rect';
                        point.shapeArgs = point.dlBox;
                    });
                });
                $('#chart21').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: scope.urbanTitle
                    },
                    xAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: scope.yTitle
                        },
                        //categories: scope.categories,
                        labels: {

                            formatter: function() {
                                var label = '';

                                switch (this.value) {
                                    case 1:
                                        label = scope.Label.getContent('SL_BASE');
                                        break;
                                    case 2:
                                        label = scope.Label.getContent('SL_FAIR');
                                        break;
                                    case 3:
                                        label = scope.Label.getContent('SL_MEDIUM');
                                        break;
                                    case 4:
                                        label = scope.Label.getContent('SL_ENHANCED');
                                        break;
                                    case 5:
                                        label = scope.Label.getContent('SL_PREMIUM');
                                        break;
                                    default:
                                        label = '';
                                        break;
                                }
                                return label;
                            }
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
                            var label = '';

                            switch (this.point.y) {
                                case 1:
                                    label = scope.Label.getContent('SL_BASE');
                                    break;
                                case 2:
                                    label = scope.Label.getContent('SL_FAIR');
                                    break;
                                case 3:
                                    label = scope.Label.getContent('SL_MEDIUM');
                                    break;
                                case 4:
                                    label = scope.Label.getContent('SL_ENHANCED');
                                    break;
                                case 5:
                                    label = scope.Label.getContent('SL_PREMIUM');
                                    break;
                                default:
                                    label = '';
                                    break;
                            }
                            if (this.point.z == 100) {
                                var s = '<p>' + this.series.name + '</p>' + label + '</p>';
                            } else {
                                var s = '<p>' + scope.previousInfo + '</p><p>' + this.series.name + '</p>' + '<p>' + label + '</p>';
                            }
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: scope.serviceLevels.urban
                });
            }

        });
    }
})
app.directive('retailerServiceLevel2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.serviceLevels != undefined) {
                $('#chart22').empty();
                $('#chart22').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: scope.ruralTitle
                    },
                    xAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: scope.yTitle
                        },
                        //categories: scope.categories,
                        labels: {

                            formatter: function() {
                                var label = '';

                                switch (this.value) {
                                    case 1:
                                        label = scope.Label.getContent('SL_BASE');
                                        break;
                                    case 2:
                                        label = scope.Label.getContent('SL_FAIR');
                                        break;
                                    case 3:
                                        label = scope.Label.getContent('SL_MEDIUM');
                                        break;
                                    case 4:
                                        label = scope.Label.getContent('SL_ENHANCED');
                                        break;
                                    case 5:
                                        label = scope.Label.getContent('SL_PREMIUM');
                                        break;
                                    default:
                                        label = '';
                                        break;
                                }
                                return label;
                            }
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
                            var label = '';

                            switch (this.point.y) {
                                case 1:
                                    label = scope.Label.getContent('SL_BASE');
                                    break;
                                case 2:
                                    label = scope.Label.getContent('SL_FAIR');
                                    break;
                                case 3:
                                    label = scope.Label.getContent('SL_MEDIUM');
                                    break;
                                case 4:
                                    label = scope.Label.getContent('SL_ENHANCED');
                                    break;
                                case 5:
                                    label = scope.Label.getContent('SL_PREMIUM');
                                    break;
                                default:
                                    label = '';
                                    break;
                            }
                            if (this.point.z == 100) {
                                var s = '<p>' + this.series.name + '</p>' + label + '</p>';
                            } else {
                                var s = '<p>' + scope.previousInfo + '</p><p>' + this.series.name + '</p>' + '<p>' + label + '</p>';
                            }
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: scope.serviceLevels.rural
                });
            }

        });
    }
})

app.directive('urbanElecssoriesBrand1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart1').empty();
                $('#highchart1').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
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
                    series: scope.brand.urban_ele.mySeries1
                });
            }
        });
    }
})
app.directive('urbanElecssoriesBrand2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart2').empty();
                $('#highchart2').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['', '', '', '', '', '']
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
                    series: scope.brand.urban_ele.mySeries2
                });
            }
        });
    }
})

app.directive('ruralElecssoriesBrand1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart3').empty();
                $('#highchart3').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
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
                    series: scope.brand.rural_ele.mySeries1
                });
            }
        });
    }
})
app.directive('ruralElecssoriesBrand2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart4').empty();
                $('#highchart4').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['', '', '', '', '', '']
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
                    series: scope.brand.rural_ele.mySeries2
                });
            }
        });
    }
})

app.directive('urbanHealthBeautiesBrand1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart5').empty();
                $('#highchart5').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        title: {
                            text: scope.xTitle11
                        }
                    },
                    yAxis: {
                        title: {
                            text: scope.yTitle11
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
                    series: scope.brand.urban_hea.mySeries1
                });
            }
        });
    }
})
app.directive('urbanHealthBeautiesBrand2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart6').empty();
                $('#highchart6').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['', '', '', '', '', '']
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
                    series: scope.brand.urban_hea.mySeries2
                });
            }
        });
    }
})

app.directive('ruralHealthBeautiesBrand1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart7').empty();
                $('#highchart7').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        title: {
                            text: scope.xTitle11
                        }
                    },
                    yAxis: {
                        title: {
                            text: scope.yTitle11
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
                    series: scope.brand.rural_hea.mySeries1
                });
            }
        });
    }
})
app.directive('ruralHealthBeautiesBrand2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined && scope.brand != undefined) {
                $('#highchart8').empty();
                $('#highchart8').highcharts({
                    chart: {
                        type: 'bubble',
                        zoomType: 'xy',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['', '', '', '', '', '']
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
                    series: scope.brand.rural_hea.mySeries2
                });
            }
        });
    }
})

app.directive('awarenessElecssories1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#awarenessElecssories1').empty();
                var draw = function() {
                    $('#awarenessElecssories1').highcharts({
                        xAxis: scope.awarenessResult.urban_ele.awarenessConfig.options.xAxis,
                        yAxis: scope.awarenessResult.urban_ele.awarenessConfig.options.yAxis,
                        tooltip: scope.awarenessResult.urban_ele.awarenessConfig.options.tooltip,
                        series: scope.awarenessResult.urban_ele.awarenessConfig.series,
                        plotOptions: scope.awarenessResult.urban_ele.awarenessConfig.options.plotOptions,
                        title: scope.awarenessResult.urban_ele.awarenessConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})
app.directive('awarenessElecssories2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#awarenessElecssories2').empty();
                var draw = function() {
                    $('#awarenessElecssories2').highcharts({
                        xAxis: scope.awarenessResult.rural_ele.awarenessConfig.options.xAxis,
                        yAxis: scope.awarenessResult.rural_ele.awarenessConfig.options.yAxis,
                        tooltip: scope.awarenessResult.rural_ele.awarenessConfig.options.tooltip,
                        series: scope.awarenessResult.rural_ele.awarenessConfig.series,
                        plotOptions: scope.awarenessResult.rural_ele.awarenessConfig.options.plotOptions,
                        title: scope.awarenessResult.rural_ele.awarenessConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})

app.directive('awarenessHealthBeauties1', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#awarenessHealthBeauties1').empty();
                var draw = function() {
                    $('#awarenessHealthBeauties1').highcharts({
                        xAxis: scope.awarenessResult.urban_hea.awarenessConfig.options.xAxis,
                        yAxis: scope.awarenessResult.urban_hea.awarenessConfig.options.yAxis,
                        tooltip: scope.awarenessResult.urban_hea.awarenessConfig.options.tooltip,
                        series: scope.awarenessResult.urban_hea.awarenessConfig.series,
                        plotOptions: scope.awarenessResult.urban_hea.awarenessConfig.options.plotOptions,
                        title: scope.awarenessResult.urban_hea.awarenessConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})
app.directive('awarenessHealthBeauties2', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(v) {
            if (v != undefined) {
                $('#awarenessHealthBeauties2').empty();
                var draw = function() {
                    $('#awarenessHealthBeauties2').highcharts({
                        xAxis: scope.awarenessResult.rural_hea.awarenessConfig.options.xAxis,
                        yAxis: scope.awarenessResult.rural_hea.awarenessConfig.options.yAxis,
                        tooltip: scope.awarenessResult.rural_hea.awarenessConfig.options.tooltip,
                        series: scope.awarenessResult.rural_hea.awarenessConfig.series,
                        plotOptions: scope.awarenessResult.rural_hea.awarenessConfig.options.plotOptions,
                        title: scope.awarenessResult.rural_hea.awarenessConfig.title,
                        chart: {
                            type: 'bar',
                            backgroundColor: 'transparent'
                        },
                        credits: {
                            enabled: false
                        }
                    })
                }
                setTimeout(draw, 100);
            }

        });
    }
})






app.directive('marketEvolutionConsumer', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(newValue) {
            if (newValue != undefined) {

                var charts = [];

                //根据角标动态判断是显示还是隐藏每一个图表内对应series的数据
                function toggleSeries(i) {
                    var li = $('#marketEvolutionConsumerLegend li:eq(' + i + ')').toggleClass('hidden'),
                        hidden = li.hasClass('hidden');
                    //遍历所有图表对象
                    for (var serie, c = 0; c < charts.length; c++) {
                        serie = charts[c].series[i];
                        serie[hidden ? 'hide' : 'show']();
                    }
                }
                charts[0] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart50',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.consumer.ele_urban.options.xAxis,
                    yAxis: scope.marketEvolution.consumer.ele_urban.options.yAxis,
                    tooltip: scope.marketEvolution.consumer.ele_urban.options.tooltip,
                    series: scope.marketEvolution.consumer.ele_urban.series,
                    title: scope.marketEvolution.consumer.ele_urban.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }, function(chart) {
                    var $legend = $('#marketEvolutionConsumerLegend');
                    //动态渲染图例且给每一个li对象绑定click点击事件
                    for (i = 0; i < chart.series.length; i++) {
                        (function(serie, i, $legend) {
                            $('<li>')
                                .css('color', serie.color)
                                .append('<span class="circle" style="background-color:' + serie.color + ';">&nbsp;</span>')
                                .append(serie.name)
                                .click(function() {
                                    toggleSeries(i);
                                })
                                .appendTo($legend);
                        })(chart.series[i], i, $legend);
                    }
                });
                charts[1] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart51',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.consumer.ele_rural.options.xAxis,
                    yAxis: scope.marketEvolution.consumer.ele_rural.options.yAxis,
                    tooltip: scope.marketEvolution.consumer.ele_rural.options.tooltip,
                    series: scope.marketEvolution.consumer.ele_rural.series,
                    title: scope.marketEvolution.consumer.ele_rural.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[2] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart52',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.consumer.hea_urban.options.xAxis,
                    yAxis: scope.marketEvolution.consumer.hea_urban.options.yAxis,
                    tooltip: scope.marketEvolution.consumer.hea_urban.options.tooltip,
                    series: scope.marketEvolution.consumer.hea_urban.series,
                    title: scope.marketEvolution.consumer.hea_urban.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[3] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart53',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.consumer.hea_rural.options.xAxis,
                    yAxis: scope.marketEvolution.consumer.hea_rural.options.yAxis,
                    tooltip: scope.marketEvolution.consumer.hea_rural.options.tooltip,
                    series: scope.marketEvolution.consumer.hea_rural.series,
                    title: scope.marketEvolution.consumer.hea_rural.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });

                $('.marketEvolutionConsumerChart').bind('mousedown', function() {

                    $($(this).siblings()).toggle();

                    $(this).toggleClass('modal-chart');

                    $(this).highcharts().reflow();
                });


            }

        });
    }
});

app.directive('marketEvolutionShopper', function() {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngModel, function(newValue) {
            if (newValue != undefined) {

                var charts = [];

                //根据角标动态判断是显示还是隐藏每一个图表内对应series的数据
                function toggleSeries(i) {
                    var li = $('#marketEvolutionShopperLegend li:eq(' + i + ')').toggleClass('hidden'),
                        hidden = li.hasClass('hidden');
                    //遍历所有图表对象
                    for (var serie, c = 0; c < charts.length; c++) {
                        serie = charts[c].series[i];
                        serie[hidden ? 'hide' : 'show']();
                    }
                }
                charts[0] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart54',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.shopper.ele_urban.options.xAxis,
                    yAxis: scope.marketEvolution.shopper.ele_urban.options.yAxis,
                    tooltip: scope.marketEvolution.shopper.ele_urban.options.tooltip,
                    series: scope.marketEvolution.shopper.ele_urban.series,
                    title: scope.marketEvolution.shopper.ele_urban.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                }, function(chart) {
                    var $legend = $('#marketEvolutionShopperLegend');
                    //动态渲染图例且给每一个li对象绑定click点击事件
                    for (i = 0; i < chart.series.length; i++) {
                        (function(serie, i, $legend) {
                            $('<li>')
                                .css('color', serie.color)
                                .append('<span class="circle" style="background-color:' + serie.color + ';">&nbsp;</span>')
                                .append(serie.name)
                                .click(function() {
                                    toggleSeries(i);
                                })
                                .appendTo($legend);
                        })(chart.series[i], i, $legend);
                    }
                });
                charts[1] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart55',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.shopper.ele_rural.options.xAxis,
                    yAxis: scope.marketEvolution.shopper.ele_rural.options.yAxis,
                    tooltip: scope.marketEvolution.shopper.ele_rural.options.tooltip,
                    series: scope.marketEvolution.shopper.ele_rural.series,
                    title: scope.marketEvolution.shopper.ele_rural.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[2] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart56',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.shopper.hea_urban.options.xAxis,
                    yAxis: scope.marketEvolution.shopper.hea_urban.options.yAxis,
                    tooltip: scope.marketEvolution.shopper.hea_urban.options.tooltip,
                    series: scope.marketEvolution.shopper.hea_urban.series,
                    title: scope.marketEvolution.shopper.hea_urban.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });
                charts[3] = new Highcharts.Chart({
                    chart: {
                        renderTo: 'shareChart57',
                        backgroundColor: 'transparent'
                    },
                    xAxis: scope.marketEvolution.shopper.hea_rural.options.xAxis,
                    yAxis: scope.marketEvolution.shopper.hea_rural.options.yAxis,
                    tooltip: scope.marketEvolution.shopper.hea_rural.options.tooltip,
                    series: scope.marketEvolution.shopper.hea_rural.series,
                    title: scope.marketEvolution.shopper.hea_rural.title,
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    }
                });

                $('.marketEvolutionShopperChart').bind('mousedown', function() {

                    $($(this).siblings()).toggle();

                    $(this).toggleClass('modal-chart');

                    $(this).highcharts().reflow();
                });


            }

        });
    }
});