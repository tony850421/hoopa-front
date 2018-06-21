'use strict';

angular.module('myApp.Main', ['ngRoute'])

.controller('MainCtrl', ['$rootScope', '$scope', '$window', '$translate', function($rootScope, $scope, $window, $translate) {

    // $scope.baseUrl = 'https://hoopa.org/front-end/#!/';
    $scope.baseUrl = 'http://localhost:8000/#!/';
    // $scope.baseUrl = 'http://localhost/hoopa-front/app/#!/';
    
    $rootScope.customGoTo = function(route) {
        $window.location.href = $scope.baseUrl + route;
    };

    $scope.setLanguage = function(lan){
        $translate.use(lan);
    };

}]);

