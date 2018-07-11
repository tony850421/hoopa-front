'use strict';

angular.module('myApp.BussinesSystem', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bussinessystem', {
            templateUrl: 'views/bussinesSystem/bussinesSystem.html',
            controller: 'BussinesSystemCtrl'
        });
    }])

    .controller('BussinesSystemCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {
        
        $rootScope.showBanner = false;

        $rootScope.divBottomLiActive = 'SERVICES';

        $scope.focusOn = function(id){
            document.getElementById(id).scrollIntoView();
        };
    }])