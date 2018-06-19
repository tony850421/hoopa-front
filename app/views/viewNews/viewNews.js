'use strict';

angular.module('myApp.ViewNews', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewNews/:param1', {
            templateUrl: 'views/viewNews/viewNews.html',
            controller: 'ViewNewsCtrl'
        });
    }])

    .controller('ViewNewsCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {
        console.log($routeParams.param1);
    }]);