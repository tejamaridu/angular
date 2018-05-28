
var app = angular.module("myApp", []);
app.controller("emp", ["$scope", "$http", "$log", function($scope, $http, $log){
  $scope.x = 10;
  $scope.y = 20;

  $scope.doSum = function(){
      $http({
        url: 'http://localhost:8080/webSerives/resources/utils/getSum?a=' +$scope.x +'&b=' +$scope.y,
        method: 'GET'
      })
      .then(function(resp){
        // Success
        debugger;
        $log.log(resp.data);
        $scope.sum = resp.data;
      }, function(resp){
        // Failure
        $log.log('Error');
      });
  }
}]);
