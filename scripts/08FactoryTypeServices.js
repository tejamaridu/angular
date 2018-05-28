
var app = angular.module('myApp', []);
app.controller('emp', ['$scope', 'calFactory', '$http', '$log',
    function($scope, calFactory, $http, $log){
  $scope.x = 10;
  $scope.y = 20;

  // Normal returning
  // $scope.doSum = function(){
  //   $scope.sum = calFactory.getSum($scope.x, $scope.y);
  // }

  // With callback function
  $scope.doSum = function(){
    calFactory.getSum($scope.x, $scope.y, function(result){
        $scope.sum = result;
    });
  }
}]);

app.factory('calFactory', ['$http', '$log',
function($http, $log){
  var calFactoryObj = {};

  // Normal returning
  // calFactoryObj.getSum = function(a, b){
  //   return parseInt(a) + parseInt(b);
  // }

  // With callback function
  // calFactoryObj.getSum = function(a, b, cb){
  //   var s = parseInt(a) + parseInt(b);
  //   cb(s);
  // }

  // With restfull web services
   calFactoryObj.getSum = function(a, b, cb){
     $http({
       url: 'http://localhost:8080/webSerives/resources/utils/getSum?a=' +a +'&b=' +b,
       method: 'GET'
     }).then(function(resp){
       cb(resp.data);
     }, function(resp){
       cb('Error occurred!!');
     })
   }

  return calFactoryObj;
}]);
