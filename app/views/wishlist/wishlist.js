'use strict';

angular.module('myApp.Wishlist', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wishlist', {
            templateUrl: 'views/wishlist/wishlist.html',
            controller: 'WishlistCtrl'
        });
    }])

    .controller('WishlistCtrl', ['$rootScope', '$scope', '$routeParams', '$translate', function ($rootScope, $scope, $routeParams, $translate) {

        $('html,body').scrollTop(0);

        $rootScope.showBanner = false;
        $rootScope.divBottomLiActive = 'ASSETS';
        $scope.shopCartArray = [];

        $scope.init = function () {
            var currentUser = AV.User.current();

            if (currentUser) {
                var query = new AV.Query('ShopCar');
                query.equalTo('user', currentUser);
                query.include('image');
                query.include('project');
                query.descending('createdAt');
                query.find().then(res => {
                    $scope.shopCartArray = [];
                    for (var i = 0; i < res.length; i++) {
                        var aux = res[i].get('project').get('description');
                        if (res[i].get('project').get('description').length > 30) {
                            aux = '';
                            for (var t = 0; t < 30; t++) {
                                aux += res[i].get('project').get('description')[t];
                            }
                            aux += "...";
                        }
                        res[i].get('project').set('description', aux);
                    }

                    $scope.shopCartArray = res;
                    $scope.$apply();
                })
            }
        };

        $scope.init();

        $scope.goToProject = function (id) {
            $rootScope.customGoTo('project-details/' + id);
        };

        $scope.removeWishList = function (id) {
            var product = AV.Object.createWithoutData('ShopCar', id);
            product.destroy().then(function (prod) {
                for (var i = 0; i < $scope.shopCartArray.length; i++) {
                    if ($scope.shopCartArray[i].id == id) {
                        $scope.shopCartArray.splice(i, 1);
                        var removeWish = $translate.instant('REMOVEWISH');
                        $rootScope.displayAlert('success', removeWish);
                        $rootScope.initWishList();
                        $scope.init();
                    }
                }
            });
        };

        $scope.removeAll = function () {
            for (var i = 0; i < $scope.shopCartArray.length; i++) {
                var product = AV.Object.createWithoutData('ShopCar', $scope.shopCartArray[i].id);
                product.destroy().then(function (prod) {
                    $rootScope.initWishList();
                    $scope.init();
                });
            }
        };

    }]);