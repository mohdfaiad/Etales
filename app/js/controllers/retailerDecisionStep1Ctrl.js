define(['app'], function(app) {
		app.controller('retailerDecisionStep1Ctrl',
			['$scope','$q','$rootScope','$http','$filter','RetailerDecisionBase', function($scope,$q,$rootScope,$http,$filter,RetailerDecisionBase) {
			$rootScope.decisionActive="active";
			//var calculate='../js/controllers/untils/calculate.js';
			//var calculate=require('');
			var multilingual=[{
						'shortName':'Products_Portfolio_Management',
						'labelENG':'Products Portfolio Management',
						'labelRUS':'',
						'labelCHN':'产品组合管理',
						'label':''
					},{
						'shortName':'Next',
						'labelENG':'Next',
						'labelRUS':'',
						'labelCHN':'下一步',
						'label':''
					},{
						'shortName':'Category',
						'labelENG':'Category',
						'labelRUS':'',
						'labelCHN':'品类',
						'label':''
					},{
						'shortName':'IICC',
						'labelENG':'Investment in Capacity Change',
						'labelRUS':'',
						'labelCHN':'包',
						'label':''					
					},{
						'shortName':'ITIAT',
						'labelENG':'Investment to imorove Available Technology',
						'labelRUS':'',
						'labelCHN':'技术水平',
						'label':''
					},{
						'shortName':'ITIF',
						'labelENG':'Investment to improve Flexibility',
						'labelRUS':'',
						'labelCHN':'活性剂',
						'label':''
					},{
						'shortName':'ITIDK',
						'labelENG':'Investment to improve Design Know-How',
						'labelRUS':'',
						'labelCHN':'增滑技术',
						'label':''
					}];
			var language='English',
				retailerID=1,
				period=0,
				isCollapsed=true;
				$scope.isCollapsed=isCollapsed;
			$scope.multilingual=multilingual;
			$scope.language=language;
			$scope.retailerID=retailerID;
			$scope.period=period;

			RetailerDecisionBase.reload({period:'0',seminar:'MAY',retailerID:1}).then(function(base){
			//ProducerDecisionBase.reload({period:'0', seminar:'MAY', retailerID:1}).then(function(base){
				$scope.pageBase = base;
			}).then(function(){
				return promiseStep1();
			}), function(reason){
				console.log('from ctr: ' + reason);
			}, function(update){
				console.log('from ctr: ' + update);
			};

			var promiseStep1=function(){
				var delay=$q.defer();
				delay.notify('start to show view');

					$scope.showView=showView;
					$scope.updateRetailerDecision=updateRetailerDecision;
					$scope.getMoreInfo=getMoreInfo;
					$scope.closeInfo=closeInfo;
				var result=showView($scope.retailerID,$scope.period,$scope.language);
				delay.resolve(result);
				if (result==1) {
					delay.resolve(result);
				} else {
					delay.reject('showView error,products is null');
				}
				return delay.promise;
			}


			/*Load Page*/
			var showView=function(retailerID,period,language){
				$scope.retailerID=retailerID,$scope.period=period,$scope.language=language;
				var shortLanguages={},fullLanguages={};
				if(language=="English"){
					for(var i=0;i<$scope.multilingual.length;i++){
						$scope.multilingual[i].label=$scope.multilingual[i].labelENG;
						shortLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].shortName;
						fullLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].label;
					}
				}
				else if(language=="Chinese"){
					for(var i=0;i<$scope.multilingual.length;i++){
						$scope.multilingual[i].label=$scope.multilingual[i].labelCHN;
						shortLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].shortName;
						fullLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].label;
					}
				}
	      		var count=0,result=0;
	      		/*var categorys=new Array();
	      		for(var i=0;i<$scope.pageBase.proCatDecision.length;i++){
	      			categorys.push($scope.pageBase.proCatDecision[i]);
	      			count++;
	      		}
	      		if(count!=0){
	      			result=1;
	      		}
	      		$scope.categorys=categorys;*/
	      		result=1;
				$scope.shortLanguages=shortLanguages;
				$scope.fullLanguages=fullLanguages;
				return result;
			}

			var updateRetailerDecision=function(categoryID,location,index){
				ProducerDecisionBase.setProducerDecisionCategory(categoryID,location,$scope.categorys[index][location]);
				$scope.$broadcast('producerDecisionBaseChanged');
			}

			var closeInfo=function(){
				$scope.isCollapsed=true;
			}

			var getMoreInfo=function(){
				$scope.moreInfo={'categoryID':$scope.retailerID};
				$scope.isCollapsed=false;
			}

			var loadNameNum=function(){//load the sort
				/*importantt*/
			}		

			$scope.$on('producerDecisionBaseChanged', function(event){	
				$scope.pageBase=ProducerDecisionBase.getBase();
				showView($scope.retailerID,$scope.period,$scope.language);
				$scope.$broadcast('closemodal');

			});  
			$scope.$on('producerDecisionBaseChangedFromServer', function(event, newBase){
			}); 	

	}]);
});