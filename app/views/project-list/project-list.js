'use strict';

angular.module('myApp.ProjectList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/project-list', {
    templateUrl: 'views/project-list/project-list.html',
    controller: 'ProjectListCtrl'
  });
}])

.controller('ProjectListCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

  $rootScope.showBanner = false;

}]);