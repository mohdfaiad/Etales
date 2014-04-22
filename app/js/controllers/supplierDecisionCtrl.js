define(['app','socketIO','routingConfig'], function(app) {
	app.controller('supplierDecisionCtrl',['$scope', '$http', 'ProducerDecisionBase','$rootScope','Auth','$anchorScroll','$q','PlayerInfo','SeminarInfo','PeriodInfo','Label','RoleInfo', function($scope, $http, ProducerDecisionBase,$rootScope,Auth,$anchorScroll,$q,PlayerInfo,SeminarInfo,PeriodInfo,Label,RoleInfo) {
			
			$rootScope.decisionActive="active";
			$rootScope.loginCss="";
		    $rootScope.loginFooter="bs-footer";
		    $rootScope.loginLink="footer-links";
		    $rootScope.loginDiv="container";

			$scope.isCollapsed=true;

		    $scope.$watch('isPageLoading', function(newValue, oldValue){
		    	$scope.isPageLoading = newValue;	    	
		    })

		    var switching=function(type){
		    	$scope.ProductPortfolioManagement=$scope.BMListPrices=$scope.ProductionVolume=$scope.Cross=false;
		    	switch(type){
		    		case 'showProductPortfolioManagement':$scope.ProductPortfolioManagement=true;break;
		    		case 'showBMListPrices':$scope.BMListPrices=true;break;
		    		case 'showProductionVolume':$scope.ProductionVolume=true;break;
		    		case 'showCross':$scope.Cross=true;break;
		    	}
		    }

	    	var showProductPortfolioManagement=function(){
	    		switching('showProductPortfolioManagement');
	    	}

	    	$scope.showBMListPrices=function(){
	    		switching('showBMListPrices');
	    	}

	    	$scope.showProductionVolume=function(){
	    		switching('showProductionVolume');
	    	}

	    	$scope.showCross=function(){
	    		switching('showCross');
	    	}

	    	$scope.switching=switching;
	    	$scope.showProductPortfolioManagement=showProductPortfolioManagement;

	    	showProductPortfolioManagement();
		    
	}]);

});