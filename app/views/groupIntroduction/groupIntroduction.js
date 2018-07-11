'use strict';

angular.module('myApp.GroupIntroduction', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/groupIntroduction', {
      templateUrl: 'views/groupIntroduction/groupIntroduction.html',
      controller: 'GroupIntroductionCtrl'
    });
  }])

  .controller('GroupIntroductionCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {
    $rootScope.showBanner = false;
    $rootScope.divBottomLiActive = 'GROUP';
  }])