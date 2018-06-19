'use strict';

angular.module('myApp.Home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  
  $rootScope.showBanner = true;

}]);