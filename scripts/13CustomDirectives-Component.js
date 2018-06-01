
var app = angular.module('myApp', []);
app.controller('emp', ['$scope', function($scope){
  $scope.msg = 'This second message';
  
  $scope.getEmployees = function(){
    calService.fetchEmployees(function(r){
      $scope.employees = r;
  });
}]);

app.directive('myInfoMsg', function(){
  return {
      templateUrl: "my-info-msg.html"
  };
});

app.directive('empDetails', function(){
  return {
      templateUrl: "emp-details.html"
  };
});

app.service('calService', ['$http', '$log', function($http, $log){
   this.fetchEmployees = function(cb){
     $http({
       url: 'http://localhost:8080/webServices/resources/utils/sampleListJson',
       method: 'GET'
     }).then(function(resp){
       cb(resp.data);
     }, function(resp){
       cb('Error occurred!!');
     })
   }
}]);
