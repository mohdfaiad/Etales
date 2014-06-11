define(['app'], function(app) {
		app.controller('producerDecisionStep2Ctrl',
			['$scope','$q','$rootScope','$http','$filter','ProducerDecision','ProducerDecisionBase','Label','PlayerInfo','SeminarInfo','PeriodInfo', function($scope,$q,$rootScope,$http,$filter,ProducerDecision,ProducerDecisionBase,Label,PlayerInfo,SeminarInfo,PeriodInfo) {
			$rootScope.decisionActive="active";
			$rootScope.loginCss="";
		    $rootScope.loginFooter="bs-footer";
		    $rootScope.loginLink="footer-links";
		    $rootScope.loginDiv="container";

			$scope.language=Label.getCurrentLanguage();
			$scope.producerID=parseInt(PlayerInfo.getPlayer());
			$scope.period=PeriodInfo.getCurrentPeriod();
			$scope.category='Elecssories';
			$scope.isCollapsed=true;

	
			ProducerDecisionBase.reload({producerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
				$scope.pageBase = base;
			}).then(function(){
				return promiseStep1();
			}), function(reason){
				console.log('from ctr: ' + reason);
			}, function(update){
				console.log('from ctr: ' + update);
			};

			var promiseStep1=function(){
				var d=$q.defer();
				d.notify(Label.getContent('start to show view'));
					//check
					$scope.checkProduction=checkProduction;
					$scope.checkNextPriceBM=checkNextPriceBM;
					$scope.checknextPriceEmall=checknextPriceEmall;

					$scope.getPrevious=getPrevious;
					$scope.getNext=getNext;

					$scope.showView=showView;
					$scope.loadSelectCategroy=loadSelectCategroy;
					$scope.updateProducerDecision=updateProducerDecision;
					$scope.getMoreInfo=getMoreInfo;
					$scope.closeInfo=closeInfo;

					if($rootScope.user.role==8){
						//Facilitator
						$scope.facilitatorShow=true;
						var url="/currentPeriod/"+SeminarInfo.getSelectedSeminar().seminarCode;
						$http({
							method:'GET',
							url:url
						}).then(function(data){
							if(PeriodInfo.getCurrentPeriod()<data.data.currentPeriod){
								$scope.nextBtn=true;
							}else{
								$scope.nextBtn=false;
							}
							if(PeriodInfo.getCurrentPeriod()<=data.data.currentPeriod&&PeriodInfo.getCurrentPeriod()>=2){
								$scope.previousBtn=true;
							}else{
								$scope.previousBtn=false;
							}
						})
					}else{
						$scope.facilitatorShow=false;
					}

					d.resolve();
					return showView($scope.producerID,$scope.period,$scope.category,$scope.language);
				return d.promise;
			}


			/*Load Page*/
			var showView=function(producerID,period,category,language){
				var d=$q.defer();
				$scope.producerID=producerID,$scope.period=period,$scope.category=category,$scope.language=language;
				var categoryID=0,count=0,result=0,acMax=0,abMax=0,expend=0,avaiableMax=0;
				var products=new Array();
				var fakeName="";
				if(category=="Elecssories"){
					categoryID=1;
					fakeName="EName";
				}
				else if(category=="HealthBeauty"){
					categoryID=2;
					fakeName="HName";
				}
	      		var url="/companyHistoryInfo/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/P/'+parseInt(PlayerInfo.getPlayer());
	      		$http({
	      			method:'GET',
	      			url:url
	      		}).then(function(data){
	      			avaiableMax=data.data.budgetAvailable;
	      			if(PeriodInfo.getCurrentPeriod()<=1){
	      				abMax=data.data.budgetAvailable;
	      			}else{
	      				abMax=data.data.budgetAvailable+data.data.budgetSpentToDate;
	      			}
					acMax=data.data.productionCapacity[categoryID-1];
					url="/producerExpend/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod())+'/'+parseInt(PlayerInfo.getPlayer())+'/brandName/location/1';
	      			return $http({
	      				method:'GET',
	      				url:url,
	      			});
	      		}).then(function(data){
	      			expend=data.data.result;
	      			$scope.surplusExpend=abMax-expend;
	      			$scope.percentageExpend=(abMax-expend)/abMax*100;
	      			url="/productionResult/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+PeriodInfo.getCurrentPeriod()+'/'+parseInt(PlayerInfo.getPlayer())+'/'+fakeName+'/varName';
					return $http({
							method:'GET',
							url:url
						});
				}).then(function(data){
					$scope.surplusProduction=acMax-data.data.result;
					$scope.percentageProduction=(acMax-data.data.result)/acMax*100;
					$scope.producerID=producerID,$scope.period=period,$scope.category=category,$scope.language=language;
					if(category=="Elecssories"){
						$scope.EleShow=true;
						$scope.HeaShow=false;
					}
					else if(category=="HealthBeauty"){
						$scope.EleShow=false;
						$scope.HeaShow=true;
					}

					var allProCatDecisions=loadSelectCategroy(category);
				    	for(var i=0;i<allProCatDecisions.length;i++){
				     		for(var j=0;j<allProCatDecisions[i].proBrandsDecision.length;j++){
				      			if(allProCatDecisions[i].proBrandsDecision[j]!=undefined&&allProCatDecisions[i].proBrandsDecision[j].brandID!=undefined&&allProCatDecisions[i].proBrandsDecision[j].brandID!=0){
									for(var k=0;k<allProCatDecisions[i].proBrandsDecision[j].proVarDecision.length;k++){
					      				if(allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k]!=undefined&&allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k].varID!=undefined&&allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k].varID!=0){
					      					products.push(allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k]);
						      				products[count].category=category;
						      				products[count].parentBrandName=allProCatDecisions[i].proBrandsDecision[j].brandName;
						      				count++;
					      				}
					      			}
					      		}
				      		}
				   		}
				    $scope.products=products;
					if(count!=0){
						d.resolve();
					}else{
						d.reject(Label.getContent('load products fail'));
					}
				},function(){
					d.reject(Label.getContent('showView fail'));
				});
	      		return d.promise;		
			}

			/*LoadSelectCategroy*/
			var loadSelectCategroy=function(category){
				return _.filter($scope.pageBase.proCatDecision,function(obj){
					if(category=="HealthBeauty"){
						return (obj.categoryID==2);
					}else{
						return (obj.categoryID==1);
					}
	      		});
			}

			var updateProducerDecision=function(category,brandName,varName,location,tep,index){
				var categoryID;
				if(category=="Elecssories"){
					categoryID=1;
				}
				else{
					categoryID=2
				}
				if(location=="composition"){
					ProducerDecisionBase.setProducerDecisionValue(categoryID,brandName,varName,location,tep,$scope.products[index][location][tep]);							
				}
				else{
					ProducerDecisionBase.setProducerDecisionValue(categoryID,brandName,varName,location,tep,$scope.products[index][location]);													
				}
			}

			var closeInfo=function(){
				$scope.isCollapsed=true;
			}

			var getMoreInfo=function(brandName,varName){
				var catID;
				if($scope.category=="Elecssories"){
					$scope.isElecssories = true;
					$scope.isHealthBeauty = false;
					catID = 1;
				}
				else{
					$scope.isElecssories = false;
					$scope.isHealthBeauty = true;
					catID = 2;
				}				
				$scope.isCollapsed=false;
				url="/companyHistoryInfo/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/P/'+parseInt(PlayerInfo.getPlayer());
				$http({method: 'GET', url: url})
				.then(function(data) {
					//console.log($scope.variantHistory);
					$scope.companyHistory=data.data;
					var postData = {
					    period : PeriodInfo.getCurrentPeriod(),
					    seminar : SeminarInfo.getSelectedSeminar().seminarCode,
					    brandName : brandName,
					    varName : varName,
					    catID : catID,
					    userRole :  $rootScope.userRoles.producer,
					    userID : PlayerInfo.getPlayer(),								
					}
					return $http({method:'POST', url:'/getCurrentUnitCost', data:postData});
				}).then(function(data){
				   $scope.currentUnitCost = data.data.result;
				   var url='/variantHistoryInfo/'+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/'+brandName+'/'+varName;
				   return $http({method: 'GET', url: url});
				}).then(function(data){
					$scope.variantHistory=data.data;

				},function(err){
					$scope.variantHistory=new Array();
					$scope.showNewHistory={
						brandName:brandName,
						varName:varName
					}
					console.log('read history info fail:' + err.data);
				});
			}

			var checkNextPriceBM=function(category,brandName,varName,location,additionalIdx,index,value){
				var d=$q.defer();
				var categoryID=0,max=0,currentUnitCost=0;
				var filter=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if(!filter.test(value)){
					d.resolve(Label.getContent('Input a number'));
				}
				if(category=="Elecssories"){
					categoryID=1;
				}else{
					categoryID=2;
				}
				var postData = {
					period : PeriodInfo.getCurrentPeriod(),
					seminar : SeminarInfo.getSelectedSeminar().seminarCode,
					brandName : brandName,
					varName : varName,
					catID : categoryID,
					userRole :  $rootScope.userRoles.producer,
					userID : PlayerInfo.getPlayer(),								
				}
				$http({
					method:'POST',
					url:'/getCurrentUnitCost',
					data:postData
				}).then(function(data){
					currentUnitCost=data.data.result;
					if(value>4*currentUnitCost||value<0.5*currentUnitCost){
						d.resolve(Label.getContent('Input range')+':'+0.5*currentUnitCost+'~'+4*currentUnitCost);
					}else{
						d.resolve();
					}
				},function(){
					d.resolve(Label.getContent('fail'));
				})
				return d.promise;
			}

			var checknextPriceEmall=function(category,brandName,varName,location,additionalIdx,index,value){
				var d=$q.defer();
				var categoryID=0,max=0,currentUnitCost=0;
				var filter=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if(!filter.test(value)){
					d.resolve(Label.getContent('Input a number'));
				}
				if(category=="Elecssories"){
					categoryID=1;
				}else{
					categoryID=2;
				}
				var postData = {
					period : PeriodInfo.getCurrentPeriod(),
					seminar : SeminarInfo.getSelectedSeminar().seminarCode,
					brandName : brandName,
					varName : varName,
					catID : categoryID,
					userRole :  $rootScope.userRoles.producer,
					userID : PlayerInfo.getPlayer(),								
				}
				$http({
					method:'POST',
					url:'/getCurrentUnitCost',
					data:postData
				}).then(function(data){
					currentUnitCost=data.data.result;
					if(value>6*currentUnitCost||value<0.5*currentUnitCost){
						d.resolve(Label.getContent('Input range')+':'+0.5*currentUnitCost+'~'+6*currentUnitCost);
					}else{
						d.resolve();
					}
				},function(){
					d.resolve(Label.getContent('fail'));
				})
				return d.promise;
			}

			var checkProduction=function(category,brandName,varName,location,additionalIdx,index,value){
				var d = $q.defer();	
				var categoryID,max,result;
				var filter=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if(!filter.test(value)){
					d.resolve(Label.getContent('Input a number'));
				}
				if(category=="Elecssories"){
					categoryID=1;
				}else{
					categoryID=2;
				}	
				var url="/companyHistoryInfo/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/P/'+parseInt(PlayerInfo.getPlayer());
				$http({
					method:'GET',
					url:url
				}).then(function(data){
					max=data.data.productionCapacity[categoryID-1];
					url="/productionResult/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+PeriodInfo.getCurrentPeriod()+'/'+parseInt(PlayerInfo.getPlayer())+'/'+brandName+'/'+varName;
					return $http({
						method:'GET',
						url:url
					});
				}).then(function(data){
					if(parseInt(data.data.result)+parseInt(value)>max){
						d.resolve(Label.getContent('Input range')+':0~'+(max-parseInt(data.data.result)));
					}else{
						d.resolve();
					}
				},function(){
					d.resolve(Label.getContent('fail'));
				})
				return d.promise;
			}

			var getPrevious=function(){
				ProducerDecisionBase.reload({producerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getPreviousPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
					$scope.pageBase = base;	
				}).then(function(){
					return promiseStep1();
				}), function(reason){
					console.log('from ctr: ' + reason);
				}, function(update){
					console.log('from ctr: ' + update);
				};
			}

			var getNext=function(){
				ProducerDecisionBase.reload({producerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getNextPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
					$scope.pageBase = base;	
				}).then(function(){
					return promiseStep1();
				}), function(reason){
					console.log('from ctr: ' + reason);
				}, function(update){
					console.log('from ctr: ' + update);
				};
			}
	

			$scope.$on('producerDecisionBaseChangedFromServer', function(event, newBase){
				ProducerDecisionBase.reload({producerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
					$scope.pageBase = base;	
				}).then(function(){
					return promiseStep1();
				}), function(reason){
					console.log('from ctr: ' + reason);
				}, function(update){
					console.log('from ctr: ' + update);
				};
			});

	}]);
});