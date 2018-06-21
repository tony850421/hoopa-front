'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'pascalprecht.translate',
  'myApp.Main',
  'myApp.Home',
  'myApp.News',
  'myApp.ViewNews',
  'myApp.ProjectList',
  'myApp.ProjectDetails',
  'myApp.version',
  'myApp.Login',
  'myApp.Translate'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
