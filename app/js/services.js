define(['angular','angularResource'], function (angular,angularResource) {
	'use strict';

	var services=angular.module('myApp.services', ['ngResource']);
	services.value('version', '0.1');

	services.factory('ProducerDecision',['$resource', function($resource){
		return $resource('/producerDecision/:producerID/:period/:seminar',{},
			{
				save:{
					method: "POST",
					params: {
						producerID: "@producerID",
						period:"@period",
						seminar:"@seminar"
					}
				}
			})

	}]);

	services.factory('RetailerDecision',['$resource','$rootScope',function($resource,$rootScope){
		return $resource('retailerDecision/:retailerID/:period/:seminar',{retailerID:$rootScope.rootRetailerID,period:$rootScope.rootPeriod,seminar:$rootScope.rootSeminar},
		{
			save:{
				method:"POST",
				params:{
						retailerID: "@retailerID",
						period:"@period",
						seminar:"@seminar"					
				}
			}
		})
	}]);
	services.factory('VariantHistoryInfo', ['$resource', function($resource){
		return $resource('/variantHistoryInfo/:seminar/:period/:parentBrandName/:varName', {});
	}]);
	services.factory('BrandHistoryInfo', ['$resource', function($resource){
		return $resource('/brandHistoryInfo/:seminar/:period/:brandName', {});
	}]);
	services.factory('CompanyHistoryInfo', ['$resource', function($resource){
		return $resource('/companyHistoryInfo/:seminar/:period/:companyID', {});
	}]);
	services.factory('quarterHistoryInfo', ['$resource', function($resource){
		return $resource('/quarterHistoryInfo/:seminar/:period',{});
	}]);


	services.factory('ProducerDecisionLoader', ['ProducerDecision', '$route','$rootScope','$q',function(ProducerDecision, $route, $rootScope, $q) {
		return function() {
			var delay = $q.defer();
			ProducerDecision.get({producerID: $rootScope.rootProducerID,
								  period:$rootScope.rootPeriod,
								  seminar:$rootScope.rootSeminar}, function(producerDecision) {
				delay.resolve(producerDecision);
			}, function() {
				delay.reject('Unable to fetch producerDecision '  + $route.current.params.producerID);
			});
			return delay.promise;
		};
	}]);

	services.provider('ProducerDecisionBase', function(){
		var requestPara = {
				period : 0,
				producerID : 1,
				seminar : 'TEST',
			}, base;			

		this.setDefaultPara = function(p) { requestPara = p };
		this.$get = ['ProducerDecision', '$q','$rootScope', function(ProducerDecision, $q, $rootScope){
			return {
				reload : function(p){ 
					requestPara = p;
					var delay = $q.defer();
					getLoaderPromise(ProducerDecision, $q).then(function(){
						delay.resolve(base);
						startListenChangeFromServer($rootScope);
					}, function(reason){
						delay.reject(reason);
					}, function(update){
						delay.notify('notify...')
					});
					return delay.promise;
				},
				setSomething : function(sth){
					//post to server...
					base.seminar = sth;
					$rootScope.$broadcast('producerDecisionBaseChanged', base);
				},
				setProducerDecisionValue:function(categoryID,brandName,varName,location,addtionalIdx,value){
					//startListenChangeFromServer($rootScope);
					for(var i=0;i<base.proCatDecision.length;i++){
						if(base.proCatDecision[i].categoryID==categoryID){
							for(var j=0;j<base.proCatDecision[i].proBrandsDecision.length;j++){
								if(base.proCatDecision[i].proBrandsDecision[j].brandName==brandName){
									for(var k=0;k<base.proCatDecision[i].proBrandsDecision[j].proVarDecision.length;k++){
										if(base.proCatDecision[i].proBrandsDecision[j].proVarDecision[k].varName==varName){
											if(location=="packFormat"){
												if(value==1){
													value="ECONOMY";
												}
												if(value==2){
													value="STANDARD";
												}
												if(value==3){
													value="PREMIUM";
												}
											}
											if(location=="composition"){
												base.proCatDecision[i].proBrandsDecision[j].proVarDecision[k][location][addtionalIdx]=value;
											}
											else{
												base.proCatDecision[i].proBrandsDecision[j].proVarDecision[k][location]=value;
											}
											break;
										}
									}
									break;
								}
							}
							break;
						}
					}	
					console.log(base);
					//$rootScope.$broadcast('producerDecisionBaseChanged', base);
				},
				setProducerDecisionBrand:function(categoryID,brandID,location,addtionalIdx,value){
					for(var i=0;i<base.proCatDecision.length;i++){
						if(base.proCatDecision[i].categoryID==categoryID){
							for(var j=0;j<base.proCatDecision[i].proBrandsDecision.length;j++){
								if(base.proCatDecision[i].proBrandsDecision[j].brandID==brandID){
									if(location=="supportTraditionalTrade"||location=="advertisingOffLine"){//addtionalIdx=postion
										base.proCatDecision[i].proBrandsDecision[j][location][addtionalIdx]=value;
									}
									else{
										base.proCatDecision[i].proBrandsDecision[j][location]=value;
									}
									break;
								}
							}
							break;
						}
					}
					console.log(base);
				},
				setProducerDecisionCategory:function(categoryID,location,value){
					for(var i=0;i<base.proCatDecision.length;i++){
						if(base.proCatDecision[i].categoryID==categoryID){
							base.proCatDecision[i][location]=value;
						}
						break;
					}
					console.log(base);
				},
				addProductNewBrand:function(newproducerDecision,categoryID){
					for(var i=0;i<base.proCatDecision.length;i++){
						if(base.proCatDecision[i].categoryID==categoryID){
							base.proCatDecision[i].proBrandsDecision.push(newproducerDecision);
							break;
						}
					}
					console.log(base);
				},
				addProductExistedBrand:function(newproducerDecision,categoryID){
					for(var i=1;i<base.proCatDecision.length;i++){
						for(var j=1;j<base.proCatDecision[i].proBrandsDecision.length;j++){
							if(base.proCatDecision[i].proBrandsDecision[j].brandID==newproducerDecision.parentBrandID){
								base.proCatDecision[i].proBrandsDecision[j].proVarDecision.push(newproducerDecision);
							}
						}
					}
					console.log(base);
				},
				getBase : function(){
					return base;
				},
				getPara : function(){
					return requestPara;
				}
			}
		}];

		var getLoaderPromise = function(ProducerDecision, q){
			var delay = q.defer();
			delay.notify('start to get base from server....')
			ProducerDecision.get({producerID: requestPara.producerID,
								  period: requestPara.period,
								  seminar: requestPara.seminar}, function(producerDecision) {
				base = producerDecision; 
				delay.resolve(base);
			}, function() {
				delay.reject('Unable to fetch producerDecision of seminar:' + requestPara.seminar + ', period:' + requestPara.period + ', producer:' + requestPara.producerID);
			});
			return delay.promise;			
		}

		var startListenChangeFromServer = function(rootScope){
			var socket = io.connect();
			socket.on('baseChanged', function(data){
				console.log(data);
				rootScope.$broadcast('producerDecisionBaseChangedFromServer', base);
			}).on('connect', function () { 
			    socket.emit('ferret', 'tobi', function (data) {
	      			console.log(data); 
	    		});
	  		});					
		}

	});
	services.provider('RetailerDecisionBase', function(){
		var requestPara = {
				period : 0,
				retailerID : 1,
				seminar : 'TEST',
			}, base;			

		this.setDefaultPara = function(p) { requestPara = p };
		this.$get = ['RetailerDecision', '$q','$rootScope', function(RetailerDecision, $q, $rootScope){
			return {
				reload : function(p){ 
					requestPara = p;
					var delay = $q.defer();
					getRetailerPromise(RetailerDecision, $q).then(function(){
						delay.resolve(base);
						startListenChangeFromServer($rootScope);
					}, function(reason){
						delay.reject(reason);
					}, function(update){
						delay.notify('notify...')
					});
					return delay.promise;
				},
				setDetailerDecisionBase:function(location,postion,value){
					base[location][postion]=value;
					console.log(base);
				},
				setMarketDecisionBase:function(marketID,location,postion,value){
					if(location=="serviceLevel"){
						switch(value){
							case 1: value="BASE";break;
							case 2: value="FAIR";break;
							case 3: value="MEDIUM";break;
							case 4: value="ENHANCED";break;
							case 5: value="PREMIUM";break;
						}
					}
					for(var i=0;i<base.retMarketDecision.length;i++){
						if(base.retMarketDecision[i].marketID==marketID){
							if(location=="categorySurfaceShare"){
								base.retMarketDecision[i][location][postion]=value;
							}else if(location=="localAdvertising"){
								base.retMarketDecision[i][location][postion]=value;
							}else{
								base.retMarketDecision[i][location]=value;
							}
							break;
						}
					}
					console.log(base);
				},
				setRetailerDecisionValue:function(categoryID,brandName,varName,location,addtionalIdx,value){
					//startListenChangeFromServer($rootScope);
					for(var i=0;i<base.retCatDecision.length;i++){
						if(base.retCatDecision[i].categoryID==categoryID){
							for(var j=0;j<base.retCatDecision[i].retVariantDecision.length;j++){
								if(base.retCatDecision[i].retVariantDecision[j].brandName==brandName){
									for(var k=0;k<base.retCatDecision[i].retVariantDecision[j].privateLabelVarDecision.length;k++){
										if(base.retCatDecision[i].retVariantDecision[j].privateLabelVarDecision[k].varName==varName){
											if(location=="packFormat"){
												if(value==1){
													value="ECONOMY";
												}
												if(value==2){
													value="STANDARD";
												}
												if(value==3){
													value="PREMIUM";
												}
											}
											if(location=="composition"){
												base.retCatDecision[i].retVariantDecision[j].privateLabelVarDecision[k][location][addtionalIdx]=value;
											}
											else{
												base.retCatDecision[i].retVariantDecision[j].privateLabelVarDecision[k][location]=value;
											}
											break;
										}
									}
									break;
								}
							}
							break;
						}
					}	
					console.log(base);
					//$rootScope.$broadcast('producerDecisionBaseChanged', base);
				},
				setSomething : function(sth){
					//post to server...
					base.seminar = sth;
					$rootScope.$broadcast('retailerDecisionBaseChanged', base);
				},				
				addProductNewBrand:function(newproducerDecision,categoryID){
					for(var i=0;i<base.retCatDecision.length;i++){
						if(base.retCatDecision[i].categoryID==categoryID){
							base.retCatDecision[i].retVariantDecision.push(newproducerDecision);
							break;
						}
					}
					console.log(base);
				},
				addProductExistedBrand:function(newproducerDecision,categoryID){
					for(var i=0;i<base.retCatDecision.length;i++){
						for(var j=0;j<base.retCatDecision[i].retVariantDecision.length;j++){
							if(base.retCatDecision[i].retVariantDecision[j].brandID==newproducerDecision.parentBrandID){
								base.retCatDecision[i].retVariantDecision[j].privateLabelVarDecision.push(newproducerDecision);
							}
						}
					}
					console.log(base);
				},
				getBase : function(){
					return base;
				},
				getPara : function(){
					return requestPara;
				}
			}
		}];
		var getRetailerPromise=function(RetailerDecision,q){
			var delay=q.defer();
			delay.notify('start to get base from server...');
			RetailerDecision.get({retailerID:requestPara.retailerID,period:requestPara.period,seminar:requestPara.seminar},function(retailerDecision){
									base=retailerDecision;
									delay.resolve(base);
								},function(){
									delay.reject('Unable to fetch retailerDecision of seminar:' + requestPara.seminar + ', period:' + requestPara.period + ', retailer:' + requestPara.retailerID);
								});
			return delay.promise;
		}
		var startListenChangeFromServer = function(rootScope){
			var socket = io.connect();
			socket.on('baseChanged', function(data){
				console.log(data);
				rootScope.$broadcast('retailerDecisionBaseChangedFromServer', base);
			}).on('connect', function () { 
			    socket.emit('ferret', 'tobi', function (data) {
	      			console.log(data); 
	    		});
	  		});					
		}
	});
});