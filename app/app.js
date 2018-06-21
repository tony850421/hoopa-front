'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Main',
  'myApp.Home',
  'myApp.News',
  'myApp.ViewNews',
  'myApp.Projects',
  'myApp.ProjectDetails',
  'myApp.version',
  'myApp.Login',
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
