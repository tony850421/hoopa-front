'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',  
  'ngCookies',
  // 'ngSanitize',
  'pascalprecht.translate',
  'myApp.Main',
  'myApp.Home',
  'myApp.News',
  'myApp.ViewNews',
  'myApp.Projects',
  'myApp.ProjectDetails',
  'myApp.version',
  'myApp.Login',
  'angular-carousel',
  'myApp.Wishlist',
  'myApp.GroupIntroduction',
  'myApp.OrganizationStructure',
  'myApp.CoreTeam',
  'myApp.DevHistory',
  'myApp.GroupHonors',
  'myApp.Charman',
  'myApp.BussinesSystem',
  'myApp.BussinesProcess',
  'myApp.FeaturedCases',
  'myApp.BranchesOffices'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.config(['$translateProvider',
    function($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: 'translate/',
            suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en_EN');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

        // Enable sanitize
        // $translateProvider.useSanitizeValueStrategy('sanitize');

        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escape');

    }
]);