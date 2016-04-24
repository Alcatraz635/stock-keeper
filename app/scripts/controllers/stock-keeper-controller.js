'use strict';
//document.domain = 'mysite.com';
angular.module('stockKeeper', [])

.factory('stockKeeperFactory', ['$http',
    function($http) {
        return {
        	get: function($symbol){
        		console.log($http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+$symbol+'&callback=JSON_CALLBACK'));
        		return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+$symbol+'&callback=JSON_CALLBACK');
        	}
        };
    }
])

.controller('stockKeeperController', ['$scope','$http', 'stockKeeperFactory', function($scope, $http, stockKeeperFactory){
	//Ticker symbol to query the API
	$scope.stock = {};
	//Response stock data from API
	$scope.data = {};
	//Flag to indicate if the change percenatge was positive of negative
	//False = negative, True = positive
	$scope.changePercentFlag = false;

	$scope.getData = function(){
		console.log($scope.stock);
		stockKeeperFactory.get($scope.stock.symbol)
			.success(function(data){
				$scope.data= data;
				$scope.data.LastPrice = $scope.data.LastPrice.toFixed(2);
				$scope.data.Change = $scope.data.Change.toFixed(2);
				$scope.data.ChangePercent = $scope.data.ChangePercent.toFixed(2);
				$scope.data.MSDate = $scope.data.MSDate.toFixed(2);
				$scope.data.ChangeYTD = $scope.data.ChangeYTD.toFixed(2);
				$scope.data.ChangePercentYTD = $scope.data.ChangePercentYTD.toFixed(2);
				$scope.data.High = $scope.data.High.toFixed(2);
				$scope.data.Low = $scope.data.Low.toFixed(2);
				$scope.data.Open = $scope.data.Open.toFixed(2);
				console.log($scope.data.ChangePercent.slice(0, 1));
				if ($scope.data.ChangePercent.slice(0, 1) === '-') {
					$scope.changePercentFlag = false;
				}else{$scope.changePercentFlag = true;}
				console.log($scope.changePercentFlag);
			})
			.error(function(data){
				console.log(data);
			});
	};

}]);