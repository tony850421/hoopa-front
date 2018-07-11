'use strict';

angular.module('myApp.CoreTeam', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/coreteam', {
      templateUrl: 'views/coreTeam/coreTeam.html',
      controller: 'CoreTeamCtrl'
    });
  }])

  .controller('CoreTeamCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $rootScope.showBanner = false;
    $scope.selectedTab = 1;
    $rootScope.divBottomLiActive = 'GROUP';
    
  }])