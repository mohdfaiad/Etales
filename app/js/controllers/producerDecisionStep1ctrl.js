define(['app'], function(app) {
		app.controller('producerDecisionStep1Ctrl',
			['$scope','$q','$rootScope','$http','$filter','ProducerDecision','ProducerDecisionBase', function($scope,$q,$rootScope,$http,$filter,ProducerDecision,ProducerDecisionBase) {
			$rootScope.decisionActive="active";
			$rootScope.loginCss="";
		    $rootScope.loginFooter="bs-footer";
		    $rootScope.loginLink="footer-links";
		    $rootScope.loginDiv="container";
		    //console.log(popInfo);

			var multilingual=getProducerStep12Info();

			var language='English',
				//producerID=1,
				producerID=$rootScope.user.username.substring($rootScope.user.username.length-1);
				period=$rootScope.currentPeriod,
				category='Elecssories',
				isCollapsed=true;
				$scope.isCollapsed=isCollapsed;
				console.log($rootScope.currentPeriod);
			$scope.multilingual=multilingual;
			$scope.category=category;
			$scope.language=language;
			$scope.producerID=producerID;
			$scope.period=period;

			$scope.packs = [{
				value: 1, text: 'ECONOMY'
			},{
				value: 2, text: 'STANDARD'
			},{
				value: 3, text: 'PREMIUM'
			}]; 


			$scope.parameter="NewBrand";/*default add new Brand*/

			/*Angular-ui-bootstrap modal start*/

			$scope.productModalOpts = {
			    backdropFade: true,
			    dialogFade:true
			};
			/*Angular-ui-bootstrap modal end*/		
			ProducerDecisionBase.startListenChangeFromServer();
			ProducerDecisionBase.reload({producerID:$rootScope.user.username.substring($rootScope.user.username.length-1),period:$rootScope.currentPeriod,seminar:$rootScope.user.seminar}).then(function(base){
				$scope.pageBase = base;
				//ProducerDecisionBase.setSomething('TEST');	
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
					$scope.selectPacks=selectPacks;
					$scope.openProductModal=openProductModal;
					$scope.closeProductModal=closeProductModal;
					$scope.setAddNewBrand=setAddNewBrand;
					$scope.setAddNewProUnderBrand=setAddNewProUnderBrand;
					$scope.showView=showView;
					$scope.loadSelectCategroy=loadSelectCategroy;
					$scope.setBrandName=setBrandName;
					$scope.loadAllBrand=loadAllBrand;
					//$scope.selected=selected;
					//$scope.loadNameNum=loadNameNum;
					//Validate
					$scope.checkProduction=checkProduction;
					$scope.checkDesign=checkDesign;
					$scope.checkTechnology=checkTechnology;
					$scope.checkRMQ=checkRMQ;

					$scope.addNewProduct=addNewProduct;
					$scope.updateProducerDecision=updateProducerDecision;
					$scope.getMoreInfo=getMoreInfo;
					$scope.closeInfo=closeInfo;
					$scope.calculateBrandID=calculateBrandID;
					$scope.calculateVarID=calculateVarID;
					$scope.deleteProduct=deleteProduct;
				var result=showView($scope.producerID,$scope.period,$scope.category,$scope.language);
				delay.resolve(result);
				if (result==1) {
					delay.resolve(result);
				} else {
					delay.reject('showView error,products is null');
				}
				return delay.promise;
			}

			var calculateBrandID=function(proBrandsDecision,producerID){
				var result=0,min=10*producerID+1,max=producerID*10+5;
				var nums=new Array();
				for(var i=0;i<proBrandsDecision.proBrandsDecision.length;i++){
					if(proBrandsDecision.proBrandsDecision[i]!=undefined&&proBrandsDecision.proBrandsDecision[i].brandID!=undefined&&proBrandsDecision.proBrandsDecision[i].brandID!=0){
						nums.push(proBrandsDecision.proBrandsDecision[i].brandID);						
					}
				}
				nums.sort(function(a,b){return a>b?1:-1});
				//未到最大值
				if(max!=nums[nums.length-1]){
					result=nums[nums.length-1]+1;
				}
				//已经到最大值 最小值删除
				else if(min!=nums[0]){
					result=min;
				}
				else{
					for(var i=0;i<nums.length-1;i++){
						if(nums[i+1]-nums[i]!=1){
							result=nums[i]+1;
							break;
						}
					}
				}
				return result;
		    }

		    var calculateVarID=function(proVarDecision,parentBrandID){
		    	var result=0;min=parentBrandID*10+1,max=parentBrandID*10+3;
		    	var nums=new Array();
		    	for(var i=0;i<proVarDecision.proVarDecision.length;i++){
					if(proVarDecision.proVarDecision[i]!=undefined&&proVarDecision.proVarDecision[i].varID!=undefined&&proVarDecision.proVarDecision[i].varID!=0){
						nums.push(proVarDecision.proVarDecision[i].varID);
					}
				}
				nums.sort(function(a,b){return a>b?1:-1});
				//未到最大值
				if(max!=nums[nums.length-1]){
					result=nums[nums.length-1]+1;
				}
				//已经到最大值 最小值删除
				else if(min!=nums[0]){
					result=min;
				}
				else{
					result=min+1;
				}
				return result;
		    }

		    var deleteProduct=function(category,brandName,varName){
		    	if(category=="Elecssories"){
		    		category=1;
		    	}else{
		    		category=2;
		    	}
		    	ProducerDecisionBase.deleteProduct(category,brandName,varName);	
		    }
			/*Load Page*/
			var showView=function(producerID,period,category,language){
				$scope.producerID=producerID,$scope.period=period,$scope.category=category,$scope.language=language;
				var labelLanguages={},infoLanguages={};
				if(language=="English"){
					for(var i=0;i<$scope.multilingual.length;i++){
						if(category=="Elecssories"){
							$scope.EleShow="inline";
							$scope.HeaShow="none";
						}
						else if(category=="HealthBeauty"){
							$scope.EleShow="none";
							$scope.HeaShow="inline";
						}
						labelLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].labelENG;
						infoLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].infoENG;
					}
				}
				else if(language=="Chinese"){
					for(var i=0;i<$scope.multilingual.length;i++){
						if(category=="Elecssories"){
							$scope.EleShow="inline";
							$scope.HeaShow="none";
						}
						else if(category=="HealthBeauty"){
							$scope.EleShow="none";
							$scope.HeaShow="inline";
						}
						labelLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].labelCHN;
						infoLanguages[$scope.multilingual[i].shortName]=$scope.multilingual[i].infoCHN;
					}
				}
				var allProCatDecisions=loadSelectCategroy(category);
	      		var count=0,result=0;
	      		var products=new Array();
	      		for(var i=0;i<allProCatDecisions.length;i++){
	      			for(var j=0;j<allProCatDecisions[i].proBrandsDecision.length;j++){
	      				if(allProCatDecisions[i].proBrandsDecision[j].brandID!=undefined&&allProCatDecisions[i].proBrandsDecision[j].brandID!=0){
		      				for(var k=0;k<allProCatDecisions[i].proBrandsDecision[j].proVarDecision.length;k++){
		      					if(allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k].varID!=0&&allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k].varID!=undefined){
		      						products.push(allProCatDecisions[i].proBrandsDecision[j].proVarDecision[k]);
			      					products[count].category=category;
			      					products[count].parentBrandName=allProCatDecisions[i].proBrandsDecision[j].brandName;
			      					if(products[count].packFormat=="ECONOMY"){
			      						products[count].packFormat=1;
			      					}
			      					else if(products[count].packFormat=="STANDARD"){
			      						products[count].packFormat=2;
			      					}
			      					else if(products[count].packFormat=="PREMIUM"){
			      						products[count].packFormat=3;
			      					}
			      					count++;
		      					}
		      				}
		      			}
	      			}
	      		}
	      		if(count!=0){
	      			result=1;
	      		}
	      		$scope.products=products;
				$scope.labelLanguages=labelLanguages;
				$scope.infoLanguages=infoLanguages;
				//console.log(labelLanguages);
				return result;
			}

			/*set add function is lauch new Brand*/
			var setAddNewBrand=function(){
				$scope.parameter="NewBrand";/*add new Brand*/
				$scope.lauchNewCategory=1;
				setBrandName($scope.lauchNewCategory);
			}	
			/*set add function is add under a existed brand*/
			var setAddNewProUnderBrand=function(){
				$scope.parameter="ExistedBrand";/*add new product under existed Brand*/
				$scope.addNewCategory=1;
				loadAllBrand($scope.addNewCategory);
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
			/*SetBrand first and last name*/
			var setBrandName=function(category){
				if(category==1){
					category="Elecssories";
					$scope.brandFirstName="E";
				}else{
					category="HealthBeauty";
					$scope.brandFirstName="H";
				}
				$scope.brandLastName=$rootScope.user.username.substring($rootScope.user.username.length-1);/*need check*/
			}
			/*LoadAllBrand by category*/
			var loadAllBrand=function(category){
				if(category==1){
					category="Elecssories";
				}else{
					category="HealthBeauty";
				}
				var allCatProDecisions=loadSelectCategroy(category);
	      		var allBrands=new Array();
	      		for(var i=0;i<allCatProDecisions.length;i++){
	      			for(var j=0;j<allCatProDecisions[i].proBrandsDecision.length;j++){
	      				if(allCatProDecisions[i].proBrandsDecision[j]!=undefined&&allCatProDecisions[i].proBrandsDecision[j].brandID!=undefined&&allCatProDecisions[i].proBrandsDecision[j].brandID!=0){
		      				allBrands.push({'BrandID':allCatProDecisions[i].proBrandsDecision[j].brandID,'BrandName':allCatProDecisions[i].proBrandsDecision[j].brandName});	      					
	      				}
	      			}	
	      		}
	      		$scope.allBrands=allBrands;
	      		$scope.addChooseBrand=allBrands[0].BrandID;
			}

			var selectPacks = function(parentBrandName,varName) {
				var selected,postion=-1;
				for(var i=0;i<$scope.products.length;i++){
					if($scope.products[i].parentBrandName==parentBrandName&&$scope.products[i].varName==varName){
						selected = $filter('filter')($scope.packs, {value: $scope.products[i].packFormat});
						postion=i;
						break;
					}
				}
				if(postion!=-1){
					return ($scope.products[postion].packFormat && selected.length) ? selected[0].text : 'Not set'; 
				}
				else{
					return 'Not set';	
				}
			};

			var openProductModal = function () {
			    $scope.productModal = true;
			    setAddNewBrand();
			};
			var closeProductModal = function () {
			    $scope.productModal = false;
			};

			var checkProduction=function(category,brandName,varName,location,additionalIdx,index,value){
				var d = $q.defer();	
				var categoryID,max,result;
				if(category=="Elecssories"){
					categoryID=1;
				}
				else{
					categoryID=2;
				}	
				var url="/companyHistoryInfo/"+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/P/'+$rootScope.user.username.substring($rootScope.user.username.length-1);
				$http({
					method:'GET',
					url:url
				}).then(function(data){
					max=data.data.productionCapacity[categoryID-1];
				},function(data){
					d.resolve('fail');
				}).then(function(){
					url="/productionResult/"+$rootScope.user.seminar+'/'+$rootScope.currentPeriod+'/'+$rootScope.user.username.substring($rootScope.user.username.length-1)+'/'+brandName+'/'+varName;
					$http({
						method:'GET',
						url:url
					}).then(function(data){
						if(parseInt(data.data.result)+parseInt(value)>max){
							d.resolve('Input range:1~'+(max-parseInt(data.data.result)));
						}else{
							d.resolve();
						}
					},function(data){
						d.resolve('fail');
					});
				});
				return d.promise;
			}

			var checkDesign=function(category,brandName,varName,location,additionalIdx,index,value){
				var d = $q.defer();	
				var categoryID=0,max=0;
				if(category=="Elecssories"){
					categoryID=1;
					var url="/companyHistoryInfo/"+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/P/'+$rootScope.user.username.substring($rootScope.user.username.length-1);
					$http({
						method:'GET',
						url:url
					}).then(function(data){
						max=data.data.acquiredDesignLevel[categoryID-1];
						if(value<1||value>max){
							d.resolve('Input range:1~'+max);
						}
					},function(data){
						d.resolve('fail');
					}).then(function(){
						url="/producerCurrentDecision/"+$rootScope.user.seminar+'/'+$rootScope.currentPeriod+'/'+$rootScope.user.username.substring($rootScope.user.username.length-1)+'/'+brandName+'/'+varName;
						$http({
							method:'GET',
							url:url
						}).then(function(data){
							if(value>data.data.composition[2]+2||value>data.data.composition[1]+4){
								if(data.data.composition[2]+2>=data.data.composition[1]+4){
									d.resolve('Input range:1~'+(data.data.composition[1]+4));
								}else{
									d.resolve('Input range:1~'+(data.data.composition[2]+2));
								}
							}else{
								d.resolve();
							}
						},function(data){
							d.resolve('fail');
						})
					})
				}else{
					categoryID=2;
					url="/producerCurrentDecision/"+$rootScope.user.seminar+'/'+$rootScope.currentPeriod+'/'+$rootScope.user.username.substring($rootScope.user.username.length-1)+'/'+brandName+'/'+varName;
					$http({
						method:'GET',
						url:url
					}).then(function(data){
						if(value>data.data.composition[1]+2||value<1||value>data.data.composition[2]+2){
							if(data.data.composition[1]>=data.data.composition[2]){
								d.resolve('Input range:1~'+(data.data.composition[2]+2));
							}else{
								d.resolve('Input range:1~'+(data.data.composition[1]+2));
							}
						}
						else{
							d.resolve();
						}
					},function(data){
						d.resolve('fail');
					})
				}
				return d.promise;
			}

			var checkTechnology=function(category,brandName,varName,location,additionalIdx,index,value){
				var d=$q.defer();
				var categoryID=0,max=0;
				if(category=="Elecssories"){
					categoryID=1;
					var url="/companyHistoryInfo/"+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/P/'+$rootScope.user.username.substring($rootScope.user.username.length-1);
					$http({
						method:'GET',
						url:url
					}).then(function(data){
						max=data.data.acquiredTechnologyLevel[categoryID-1];
						if(value<1||value>max){
							d.resolve('Input range:1~'+max);
						}
					},function(data){
						d.resolve('fail');
					}).then(function(){
						url="/producerCurrentDecision/"+$rootScope.user.seminar+'/'+$rootScope.currentPeriod+'/'+$rootScope.user.username.substring($rootScope.user.username.length-1)+'/'+brandName+'/'+varName;
						$http({
							method:'GET',
							url:url
						}).then(function(data){
							//T>=Q-2 T>=D-2 T<=Q
							//if D>=Q--> D-2<=T<=Q 
							if(data.data.composition[0]>=data.data.composition[2]){
								if(value>data.data.composition[2]||(value<data.data.composition[0]-2)){
									d.resolve('Input range:'+(data.data.composition[0]-2)+'~'+data.data.composition[2]);
								}else{
									d.resolve();
								}
							}else{// Q-2<=T<=Q
								if(value>data.data.composition[2]||(value<data.data.composition[2]-2)){
									d.resolve('Input range:'+(data.data.composition[2]-2)+'~'+data.data.composition[2]);
								}else{
									d.resolve();
								}
							}
						},function(data){
							d.resolve('fail');
						})
					})
				}else{
					categoryID=2;
					var url="/companyHistoryInfo/"+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/P/'+$rootScope.user.username.substring($rootScope.user.username.length-1);
					$http({
						method:'GET',
						url:url
					}).then(function(data){
						max=data.data.acquiredTechnologyLevel[categoryID-1];
						if(value<1||value>max){
							d.resolve('Input range:1~'+max);
						}
					},function(data){
						d.resolve('fail');
					}).then(function(){
						url="/producerCurrentDecision/"+$rootScope.user.seminar+'/'+$rootScope.currentPeriod+'/'+$rootScope.user.username.substring($rootScope.user.username.length-1)+'/'+brandName+'/'+varName;
						$http({
							method:'GET',
							url:url
						}).then(function(data){
							if(value<(data.data.composition[2]-2)||value<(data.data.composition[0]-4)){
								if((data.data.composition[2]-2)>=(data.data.composition[0]-4)){
									d.resolve('Input range:'+(data.data.composition[2]-2)+'~'+max);
								}else{
									d.resolve('Input range:'+(data.data.composition[0]-4)+'~'+max);
								}
							}else{
								d.resolve();
							}
						},function(data){
							d.resolve('fail');
						})
					})
				}
				return d.promise;
			}

			var checkRMQ=function(category,brandName,varName,location,additionalIdx,index,value){
				var d=$q.defer();
				var categoryID=0,max=0;
				if(category=="Elecssories"){
					categoryID=1;
				}else{
					catagoryID=2;
				}
				var url="/companyHistoryInfo/"+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/P/'+$rootScope.user.username.substring($rootScope.user.username.length-1);
					$http({
						method:'GET',
						url:url
					}).then(function(data){
						max=data.data.acquiredTechnologyLevel[categoryID-1]+2;
						if(value<1||value>max){
							d.resolve('Input range:1~'+max);
						}
					},function(data){
						d.resolve('fail');
					}).then(function(){
						url="/producerCurrentDecision/"+$rootScope.user.seminar+'/'+$rootScope.currentPeriod+'/'+$rootScope.user.username.substring($rootScope.user.username.length-1)+'/'+brandName+'/'+varName;
						$http({
							method:'GET',
							url:url
						}).then(function(data){
							//Q>=D-2 Q<=T+2
							if(value<(data.data.composition[0]-2)||value>(data.data.composition[1]+2){
								d.resolve('Input range:'+(data.data.composition[0]-2)+'~'+(data.data.composition[1]+2));
							}else{
								d.resolve();
							}
						},function(){
							d.resolve('fail');
						})
					})
				return d.promise;
			}

			var updateProducerDecision=function(category,brandName,varName,location,additionalIdx,index){
				var categoryID;
				if(category=="Elecssories"){
					categoryID=1;
				}
				else{
					categoryID=2
				}
				if(location=="composition"){
					ProducerDecisionBase.setProducerDecisionValue(categoryID,brandName,varName,location,additionalIdx,$scope.products[index][location][additionalIdx]);							
				}
				else{
					ProducerDecisionBase.setProducerDecisionValue(categoryID,brandName,varName,location,additionalIdx,$scope.products[index][location]);													
				}
			}

			var closeInfo=function(){
				$scope.isCollapsed=true;
			}

			var getMoreInfo=function(brandName,varName){
				$scope.isCollapsed=false;
				var url='/variantHistoryInfo/'+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/'+brandName+'/'+varName;
				$http({method: 'GET', url: url})
				.success(function(data, status, headers, config) {
					$scope.variantHistory=data;
					console.log($scope.variantHistory);
					url="/companyHistoryInfo/"+$rootScope.user.seminar+'/'+($rootScope.currentPeriod-1)+'/P/'+$rootScope.user.username.substring($rootScope.user.username.length-1);
					$http({method:'GET',url:url})
					.success(function(data,status,headers,config){
						$scope.companyHistory=data;
						console.log($scope.companyHistory);
					})
					.error(function(data,status,headers,config){
						console.log('read companyHistoryInfo fail');
					});
				})
				.error(function(data, status, headers, config) {
					console.log('read variantHistoryInfo fail');
				});
			}

			var addNewProduct=function(parameter){
				var newBrand=new ProducerDecision();
				var nullDecision=new ProducerDecision();
				nullDecision.packFormat="ECONOMY";
				nullDecision.dateOfBirth=0;
				nullDecision.dateOfDeath=0;
		        nullDecision.composition=new Array(1,1,1);
		        nullDecision.production=0;
		        nullDecision.currentPriceBM=0;
		        nullDecision.currentPriceEmall=0;
		        nullDecision.discontinue=false;
			    nullDecision.nextPriceBM=0;
			    nullDecision.nextPriceEmall=0;
			    nullDecision.parentBrandID=0;
				nullDecision.varName="";/*need check*/
				nullDecision.varID=0;/*need check*/

				var newproducerDecision=new ProducerDecision();
				newproducerDecision.packFormat="ECONOMY";
				newproducerDecision.dateOfBirth=$scope.period;
				//newproducerDecision.parameter=parameter;
				newproducerDecision.dateOfDeath=10;
		        newproducerDecision.composition=new Array(1,1,1);
		        newproducerDecision.production="";
		        newproducerDecision.currentPriceBM="";
		        newproducerDecision.currentPriceEmall="";
		        newproducerDecision.discontinue=false;
			    newproducerDecision.nextPriceBM="";
			    newproducerDecision.nextPriceEmall="";
				if(parameter=="NewBrand"){/*lauch new Brand*/
					var proBrandsDecision=_.find($scope.pageBase.proCatDecision,function(obj){
						return (obj.categoryID==$scope.lauchNewCategory);
					});
					newBrand.brandID=calculateBrandID(proBrandsDecision,$scope.producerID);
					newBrand.brandName=$scope.brandFirstName+$scope.lauchNewBrandName+$rootScope.user.username.substring($rootScope.user.username.length-1);
					newBrand.paranetCompanyID=$scope.producerID;
					newBrand.dateOfDeath="";
					newBrand.dateOfBirth=$scope.period;
					newBrand.advertisingOffLine=new Array();
					newBrand.advertisingOnLine="";
					newBrand.supportEmall="";
					newBrand.supportTraditionalTrade=new Array();
					newBrand.proVarDecision=new Array();
					//newBrand.proVarDecision.push({});
					newproducerDecision.parentBrandID=newBrand.brandID;
					newproducerDecision.varName=$scope.lauchNewVarName;/*need check*/
					newproducerDecision.varID=10*newBrand.brandID+1;/*need check*/
					//need add 2 null vars
					newBrand.proVarDecision.push(newproducerDecision,nullDecision,nullDecision);
					ProducerDecisionBase.addProductNewBrand(newBrand,$scope.lauchNewCategory);
				}else{/*add new product under existed Brand*/
					var proBrandsDecision=_.find($scope.pageBase.proCatDecision,function(obj){
						return (obj.categoryID==$scope.addNewCategory);
					});
					newproducerDecision.parentBrandID=$scope.addChooseBrand;
					newproducerDecision.varName=$scope.addNewVarName;/*need check*/
					var proVarDecision=_.find(proBrandsDecision.proBrandsDecision,function(obj){
						return (obj.brandID==newproducerDecision.parentBrandID);
					});
			       	newproducerDecision.varID=calculateVarID(proVarDecision,newproducerDecision.parentBrandID);//121;/*need check*/
			        var newBrandName=""; 
			       	for(var i=0;i<$scope.allBrands.length;i++){
			       		if($scope.allBrands[i].BrandID==newproducerDecision.parentBrandID){
			       			newBrandName=$scope.allBrands[i].BrandName;
			       			break;
			       		}
			       	}
			       	ProducerDecisionBase.addProductExistedBrand(newproducerDecision,$scope.addNewCategory,newBrandName);	
				}
				closeProductModal();
			}
 
			
			$scope.$on('producerDecisionBaseChangedFromServer', function(event, newBase){
				ProducerDecisionBase.reload({producerID:$rootScope.user.username.substring($rootScope.user.username.length-1),period:$rootScope.currentPeriod,seminar:$rootScope.user.seminar}).then(function(base){
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