
var app = angular.module('myApp', []);
app.controller('emp', ['$scope', function($scope){
  $scope.msg = 'This second message';
}]);

app.directive('myInfoMsg', function(){
  return {
      templateUrl: "my-info-msg.html"
  };
});
