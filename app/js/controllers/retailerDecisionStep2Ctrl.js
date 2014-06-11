define(['app'], function(app) {
		app.controller('retailerDecisionStep2Ctrl',
			['$scope','$q','$rootScope','$http','$filter','RetailerDecisionBase','Label','PlayerInfo','SeminarInfo','PeriodInfo', function($scope,$q,$rootScope,$http,$filter,RetailerDecisionBase,Label,PlayerInfo,SeminarInfo,PeriodInfo) {
			$rootScope.decisionActive="active";
			$rootScope.loginCss="";
		    $rootScope.loginFooter="bs-footer";
		    $rootScope.loginLink="footer-links";
		    $rootScope.loginDiv="container";

			$scope.packs = [{
				value: 1, text: Label.getContent('SL_BASE')
			},{
				value: 2, text: Label.getContent('SL_FAIR')
			},{
				value: 3, text: Label.getContent('SL_MEDIUM')
			},{
				value: 4, text: Label.getContent('SL_ENHANCED')
			},{
				value: 5, text: Label.getContent('SL_PREMIUM')
			}]; 
			$scope.language=Label.getCurrentLanguage();
			$scope.retailerID=parseInt(PlayerInfo.getPlayer());
			$scope.period=PeriodInfo.getCurrentPeriod();
			$scope.category='Elecssories';
			$scope.isCollapsed=true;

			RetailerDecisionBase.reload({retailerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
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

					$scope.showView=showView;
					$scope.updateMarketDecision=updateMarketDecision;
					$scope.getMarketMoreInfo=getMarketMoreInfo;
					$scope.closeInfo=closeInfo;
					$scope.selectPacks=selectPacks;
					$scope.getPrevious=getPrevious;
					$scope.getNext=getNext;
					//check
					$scope.checkSurface=checkSurface;
					$scope.checkBudget=checkBudget;
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
					return showView($scope.retailerID,$scope.period,$scope.language);
				return d.promise;
			}

			var selectPacks = function(marketID) {
				//console.log('testSelectPacks');
				var selected,postion=-1;
				for(var i=0;i<$scope.markets.length;i++){
					if($scope.markets[i].marketID==marketID){
						selected = $filter('filter')($scope.packs, {value: $scope.markets[i].serviceLevel});
						postion=i;
						break;
					}
				}
				if(postion!=-1){
					return ($scope.markets[postion].serviceLevel && selected.length) ? selected[0].text : Label.getContent('Not set'); 
				}
				else{
					return Label.getContent('Not set');	
				}
			};

			/*Load Page*/
			var showView=function(retailerID,period,language){
				var d=$q.defer();
				$scope.retailerID=retailerID,$scope.period=period,$scope.language=language;
				var categoryID=0,count=0,result=0,expend=0;
				var fakeName="EName",max=100;
	      		var url="/companyHistoryInfo/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/R/'+parseInt(PlayerInfo.getPlayer());
	      		$http({
	      			method:'GET',
	      			url:url
	      		}).then(function(data){
	      			if(PeriodInfo.getCurrentPeriod()>=2){
	      				abMax=data.data.budgetAvailable+data.data.budgetSpentToDate;
	      			}else{
	      				abMax=data.data.budgetAvailable;
	      			}
	      			$scope.abMax=abMax;
	      			url="/retailerExpend/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod())+'/'+parseInt(PlayerInfo.getPlayer())+'/-1/location/1';
	      			return $http({
	      				method:'GET',
	      				url:url,
	      			});
	      		}).then(function(data){
	      			expend=data.data.result;
	      			$scope.surplusExpend=abMax-expend;
	      			$scope.percentageExpend=(abMax-expend)/abMax*100;	
	      					$scope.retailerID=retailerID,$scope.period=period,$scope.language=language;
							var markets=new Array();
							for(var i=0;i<$scope.pageBase.retMarketDecision.length;i++){
				      			if($scope.pageBase.retMarketDecision[i].marketID==1){
				      				$scope.pageBase.retMarketDecision[i].marketName="Urban";			
				      			}else if($scope.pageBase.retMarketDecision[i].marketID==2){
				      				$scope.pageBase.retMarketDecision[i].marketName="Rural";
				      			}
				      			if($scope.pageBase.retMarketDecision[i].serviceLevel=="SL_BASE"){
				      				$scope.pageBase.retMarketDecision[i].serviceLevel=1;
				      			}else if($scope.pageBase.retMarketDecision[i].serviceLevel=="SL_FAIR"){
				      				$scope.pageBase.retMarketDecision[i].serviceLevel=2;
				      			}else if($scope.pageBase.retMarketDecision[i].serviceLevel=="SL_MEDIUM"){
				      				$scope.pageBase.retMarketDecision[i].serviceLevel=3;
				      			}else if($scope.pageBase.retMarketDecision[i].serviceLevel=="SL_ENHANCED"){
				      				$scope.pageBase.retMarketDecision[i].serviceLevel=4;
				      			}else if($scope.pageBase.retMarketDecision[i].serviceLevel=="SL_PREMIUM"){
				      				$scope.pageBase.retMarketDecision[i].serviceLevel=5;
				      			}
				      			if($scope.pageBase.retMarketDecision[i].categorySurfaceShare[0]>=0&&$scope.pageBase.retMarketDecision[i].categorySurfaceShare[0]<=1){
				      				$scope.pageBase.retMarketDecision[i].categorySurfaceShare[0]*=100;
				      				$scope.pageBase.retMarketDecision[i].categorySurfaceShare[0]=$scope.pageBase.retMarketDecision[i].categorySurfaceShare[0].toFixed(2);
				      			}
				      			if($scope.pageBase.retMarketDecision[i].categorySurfaceShare[1]>=0&&$scope.pageBase.retMarketDecision[i].categorySurfaceShare[1]<=1){
				      				$scope.pageBase.retMarketDecision[i].categorySurfaceShare[1]*=100;
				      				$scope.pageBase.retMarketDecision[i].categorySurfaceShare[1]=$scope.pageBase.retMarketDecision[i].categorySurfaceShare[1].toFixed(2);
				      			}				      			
				      			markets.push($scope.pageBase.retMarketDecision[i]);
				      		}
				      		$scope.markets=markets;
				      		d.resolve();
	      		},function(){
	      			d.reject(Label('showView fail'));
	      		});	
	      		return d.promise;
			}

			//check

			var checkSurface=function(value){
				var d=$q.defer();
				var filter=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if(!filter.test(value)){
					d.resolve(Label.getContent('Input a number'));
				}
				if(parseInt(value)>65||parseInt(value)<35){
					d.resolve(Label.getContent('Input range')+':35~65');
				}else{
					d.resolve();
				}
				return d.promise;
			}

			var checkBudget=function(marketID,location,postion,additionalIdx,index,value){
				var d=$q.defer();
				var filter=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if(!filter.test(value)){
					d.resolve(Label.getContent('Input a number'));
				}
				var url="/companyHistoryInfo/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/R/'+parseInt(PlayerInfo.getPlayer());
	      		$http({
	      			method:'GET',
	      			url:url
	      		}).then(function(data){
	      			max=data.data.budgetAvailable;
	      			url="/retailerExpend/"+SeminarInfo.getSelectedSeminar().seminarCode+'/'+(PeriodInfo.getCurrentPeriod())+'/'+parseInt(PlayerInfo.getPlayer())+'/'+marketID+'/'+location+'/'+additionalIdx;
		      		return $http({
		      			method:'GET',
		      			url:url,
		     		});
	      		}).then(function(data){
	      			expend=data.data.result;
	      			if(value>max-expend){
	      				d.resolve(Label.getContent('Input range'+':0~')+(max-expend));
	      			}else{
	      				d.resolve();
	    			}
	      		},function(){
	      			d.resolve(Label.getContent('fail'));
	      		});
	      		return d.promise;
			}

			var updateMarketDecision=function(marketID,location,postion,additionalIdx,index){
				if(location=="localAdvertising"){
					RetailerDecisionBase.setMarketDecisionBase(marketID,location,additionalIdx,$scope.markets[index][location][additionalIdx]);					
				}else if(location=="categorySurfaceShare"){
					RetailerDecisionBase.setMarketDecisionBase(marketID,location,additionalIdx,($scope.markets[index][location][additionalIdx])/100);
					$scope.markets[index][location][1-additionalIdx]=((100-$scope.markets[index][location][additionalIdx])).toFixed(2);					
				}else{
					RetailerDecisionBase.setMarketDecisionBase(marketID,location,postion,$scope.markets[index][location]);										
				}
			}

			var closeInfo=function(){
				$scope.isCollapsed=true;
			}

			var getMarketMoreInfo=function(marketID){
				switch(marketID){
					case 1: $scope.marketName = 'Urban'; break;
					case 2: $scope.marketName = 'Rural'; break;				
				}
				$scope.isCollapsed=false;
				var url="/retailerDecision/"+parseInt(PlayerInfo.getPlayer())+'/'+(PeriodInfo.getCurrentPeriod()-1)+'/'+SeminarInfo.getSelectedSeminar().seminarCode;
				$http({method:'GET',url:url})
				.success(function(data){
					$scope.retailerDecisionHistory=_.filter(data.retMarketDecision,function(obj){
						return (obj.marketID==marketID);
					});
					console.log($scope.retailerDecisionHistory);
				})
				.error(function(data){
					console.log('read retailerDecisionHistory fail');
				});
			}	

			var getPrevious=function(){
				RetailerDecisionBase.reload({retailerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
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
				RetailerDecisionBase.reload({retailerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
					$scope.pageBase = base;	
				}).then(function(){
					return promiseStep1();
				}), function(reason){
					console.log('from ctr: ' + reason);
				}, function(update){
					console.log('from ctr: ' + update);
				};
			}

			
			$scope.$on('retailerDecisionBaseChangedFromServer', function(event, newBase){
				RetailerDecisionBase.reload({retailerID:parseInt(PlayerInfo.getPlayer()),period:PeriodInfo.getCurrentPeriod(),seminar:SeminarInfo.getSelectedSeminar().seminarCode}).then(function(base){
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