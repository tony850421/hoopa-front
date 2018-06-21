'use strict';

angular.module('myApp.ProjectDetails', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project-details', {
      templateUrl: 'views/project-details/project-details.html',
      controller: 'ProjectDetailstCtrl'
    });
  }])

  .controller('ProjectDetailstCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $rootScope.showBanner = false;

   

  }]);