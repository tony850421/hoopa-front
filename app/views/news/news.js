'use strict';

angular.module('myApp.News', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/news/:param1', {
    templateUrl: 'views/news/news.html',
    controller: 'NewsCtrl'
  });
}])

.controller('NewsCtrl', ['$rootScope', '$scope', '$routeParams', function($rootScope, $scope, $routeParams) {

  $rootScope.showBanner = false;
  console.log($routeParams.param1);

}]);