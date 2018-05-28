
var app = angular.module('myApp', []);
app.controller('emp', ['$scope', 'calService', '$http', '$log',
    function($scope, calService, $http, $log){
  $scope.x = 10;
  $scope.y = 20;

  $scope.doSum = function(){
    calService.getSum($scope.x, $scope.y, function(result){
        $scope.sum = result;
    });
  }
}]);

app.provider('calService', [ function(){

  // Normal case
  // this.$get = function(){
  //   var calServiceObj = {};
  //    calServiceObj.getSum = function(a, b, cb){
  //      var s = parseInt(a) + parseInt(b);
  //      cb(s);
  //    }
  //   return calServiceObj;
  // };

  // Getting configaration data
  var baseUrl = '';
  this.config = function(url){
    baseUrl = url;
  }

  // While using web services & usingconfig
  this.$get = ['$log', '$http', function($log, $http){
    var calServiceObj = {};
     calServiceObj.getSum = function(a, b, cb){
       $http({
         url: baseUrl +'/getSum?a=' +a +'&b=' +b,
         method: 'GET'
       }).then(function(resp){
         cb(resp.data);
       }, function(resp){
         cb('Error occurred!!');
       })
     }
    return calServiceObj;
  }];

}]);

app.config(['calServiceProvider', function(calServiceProvider){
  calServiceProvider.config('http://localhost:8080/webSerives/resources/utils');
}])
