var salesCtrl=function($scope,$http){
    function GetRequest() {
       var url = document.location.search; //获取url中"?"符后的字串
       var theRequest = new Object();
       if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
             theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
       }
       return theRequest;
    }
    var initPage=function(){
        var Request = GetRequest();
        var url='/getFeedBack/'+Request['seminar']+'/'+Request['period'];
        var currentCategories=new Array();
        var previousCategories=new Array();

        for(var i=-3;i<=Request['period'];i++){
            if(i!=Request['period']){
                currentCategories.push(i);
                previousCategories.push(i); 
            }else{
                currentCategories.push(i);
            }
        }

        $http({
            method:'GET',
            url:url
        }).then(function(data){
            var currentElecssoriesVolume=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var currentElecssoriesValue=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var previousElecssoriesVolume=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var previousElecssoriesValue=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var currentHealthBeautiesVolume=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var currentHealthBeautiesValue=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var previousHealthBeautiesVolume=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });
            var previousHealthBeautiesValue=new Array({
                name:'Supplier-1',
                data:new Array(),
                color:'#3257A7'
            },{
                name:'Supplier-2',
                data:new Array(),
                color:'#B11E22'
            },{
                name:'Supplier-3',
                data:new Array(),
                color:'#F6B920'
            },{
                name:'Retailer-1',
                data:new Array(),
                color:'#8B288B'
            },{
                name:'Retailer-2',
                data:new Array(),
                color:'#F05422'
            });

            for(var j=0;j<currentCategories.length;j++){
                for(var i=0;i<data.data.f_MarketSalesVolume.length;i++){
                    if(data.data.f_MarketSalesVolume[i].period==currentCategories[j]){
                        switch(data.data.f_MarketSalesVolume[i].actorID){
                            case 1:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                currentElecssoriesVolume[0].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                currentHealthBeautiesVolume[0].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 2:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                currentElecssoriesVolume[1].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                currentHealthBeautiesVolume[1].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 3:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                currentElecssoriesVolume[2].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                currentHealthBeautiesVolume[2].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 4:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                currentElecssoriesVolume[3].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                currentHealthBeautiesVolume[3].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 5:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                currentElecssoriesVolume[4].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                currentHealthBeautiesVolume[4].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                        }
                    }
                }
            }
            for(var j=0;j<currentCategories.length;j++){
                for(var i=0;i<data.data.f_MarketSalesValue.length;i++){
                    if(data.data.f_MarketSalesValue[i].period==currentCategories[j]){
                        switch(data.data.f_MarketSalesValue[i].actorID){
                            case 1:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                currentElecssoriesValue[0].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                currentHealthBeautiesValue[0].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 2:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                currentElecssoriesValue[1].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                currentHealthBeautiesValue[1].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 3:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                currentElecssoriesValue[2].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                currentHealthBeautiesValue[2].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 4:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                currentElecssoriesValue[3].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                currentHealthBeautiesValue[3].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 5:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                currentElecssoriesValue[4].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                currentHealthBeautiesValue[4].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                        }
                    }
                }
            }
            for(var j=0;j<previousCategories.length;j++){
                for(var i=0;i<data.data.f_MarketSalesVolume.length;i++){
                    if(data.data.f_MarketSalesVolume[i].period==previousCategories[j]){
                        switch(data.data.f_MarketSalesVolume[i].actorID){
                            case 1:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                previousElecssoriesVolume[0].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                previousHealthBeautiesVolume[0].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 2:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                previousElecssoriesVolume[1].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                previousHealthBeautiesVolume[1].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 3:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                previousElecssoriesVolume[2].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                previousHealthBeautiesVolume[2].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 4:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                previousElecssoriesVolume[3].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                previousHealthBeautiesVolume[3].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                            case 5:
                            if(data.data.f_MarketSalesVolume[i].categoryID==1){
                                previousElecssoriesVolume[4].data.push(data.data.f_MarketSalesVolume[i].value);
                            }else if(data.data.f_MarketSalesVolume[i].categoryID==2){
                                previousHealthBeautiesVolume[4].data.push(data.data.f_MarketSalesVolume[i].value);
                            }
                            break;
                        }
                    }
                }
            }
            for(var j=0;j<previousCategories.length;j++){
                for(var i=0;i<data.data.f_MarketSalesValue.length;i++){
                    if(data.data.f_MarketSalesValue[i].period==previousCategories[j]){
                        switch(data.data.f_MarketSalesValue[i].actorID){
                            case 1:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                previousElecssoriesValue[0].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                previousHealthBeautiesValue[0].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 2:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                previousElecssoriesValue[1].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                previousHealthBeautiesValue[1].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 3:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                previousElecssoriesValue[2].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                previousHealthBeautiesValue[2].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 4:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                previousElecssoriesValue[3].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                previousHealthBeautiesValue[3].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                            case 5:
                            if(data.data.f_MarketSalesValue[i].categoryID==1){
                                previousElecssoriesValue[4].data.push(data.data.f_MarketSalesValue[i].value);
                            }else if(data.data.f_MarketSalesValue[i].categoryID==2){
                                previousHealthBeautiesValue[4].data.push(data.data.f_MarketSalesValue[i].value);
                            }
                            break;
                        }
                    }
                }
            }

            $scope.previousSalesVolumeElecssories = {
                options: {
                    title:{
                        text:'Sales Volumes',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: 'mln units'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: previousCategories,
                        title: {
                            text: 'Period'
                        },
                        tickmarkPlacement: 'on'
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">mln units:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: previousElecssoriesVolume,
                loading: false
            }
            $scope.previousSalesVolumeHealthBeauties = {
                options: {
                    title:{
                        text:'Sales Volumes',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: 'mln units'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: previousCategories,
                        title: {
                            text: 'Period'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">mln units:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: previousHealthBeautiesVolume,
                loading: false
            }
            $scope.previousSalesValueElecssories = {
                options: {
                    title:{
                        text:'Sales Values',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: '$mln'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: previousCategories,
                        title: {
                            text: 'Period'
                        },
                        tickmarkPlacement: 'on'
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">$mln:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: previousElecssoriesValue,
                loading: false
            }
            $scope.previousSalesValueHealthBeauties = {
                options: {
                    title:{
                        text:'Sales Values',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: '$mln'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: previousCategories,
                        title: {
                            text: 'Period'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">$mln:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: previousHealthBeautiesValue,
                loading: false
            }
            $scope.currentSalesVolumeElecssories = {
                options: {
                    title:{
                        text:'Sales Volumes',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: 'mln units'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: currentCategories,
                        title: {
                            text: 'Period'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">mln units:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: currentElecssoriesVolume,
                loading: false
            }
            $scope.currentSalesVolumeHealthBeauties = {
                options: {
                    title:{
                        text:'Sales Volumes',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: 'mln units'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: currentCategories,
                        title: {
                            text: 'Period'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">mln units:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: currentHealthBeautiesVolume,
                loading: false
            }
            $scope.currentSalesValueElecssories = {
                options: {
                    title:{
                        text:'Sales Values',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: '$mln'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: currentCategories,
                        title: {
                            text: 'Period'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">$mln:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: currentElecssoriesValue,
                loading: false
            }
            $scope.currentSalesValueHealthBeauties = {
                options: {
                    title:{
                        text:'Sales Values',
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: 'transparent',
                    },
                    yAxis: {
                        title: {
                            text: '$mln'
                        },
                        gridLineColor: 'transparent'
                    },
                    xAxis: {
                        categories: currentCategories,
                        title: {
                            text: 'Period'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = '<p style="font-size:20px;line-height:20px;">'+this.series.name+'</p>'+'<p style="font-size:20px;line-height:20px;">Period:'+this.key+'</p>'+'<p style="font-size:20px;line-height:20px;">$mln:'+this.point.y.toFixed(2)+'</p>';
                            return s;
                        },
                        shared: false,
                        useHTML: true
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: currentHealthBeautiesValue,
                loading: false
            }

        });
    }
    initPage();
}
