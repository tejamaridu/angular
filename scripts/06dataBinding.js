
var app = angular.module("myApp", []);
app.controller("emp", function($scope){
  $scope.x = 10;
  $scope.y = 20;

  $scope.getDoubleSum = function(){
    $scope.x = $scope.x * 2;
    $scope.y = $scope.y * 2;
    $scope.sum = $scope.x + $scope.y;
  }
});
