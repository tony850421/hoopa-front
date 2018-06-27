'use strict';

angular.module('myApp.OrganizationStructure', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/organizationStructure', {
      templateUrl: 'views/organizationStructure/organizationStructure.html'
    });
  }])