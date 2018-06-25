'use strict';

angular.module('myApp.Wishlist', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wishlist', {
            templateUrl: 'views/wishlist/wishlist.html',
            controller: 'WishlistCtrl'
        });
    }])

    .controller('WishlistCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

        $('html,body').scrollTop(0);

        $rootScope.showBanner = false;

        $scope.projectId = $routeParams.id;

        $scope.init = function () {
            var id = $scope.projectId;

        };

        $scope.init();

        $scope.goToProject = function (id) {
            $rootScope.customGoTo('project-details/' + id);
        };

    }]);