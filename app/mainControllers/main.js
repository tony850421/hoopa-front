'use strict';

angular.module('myApp.Main', ['ngRoute'])

.controller('MainCtrl', ['$rootScope', '$scope', '$window', function($rootScope, $scope, $window) {

    $scope.baseUrl = 'http://localhost:8000/#!/';
    
    $scope.customGoTo = function(route) {
        // $state.go(route);
        $window.location.href = $scope.baseUrl + route;
    };

}]);

