'use strict';

angular.module('myApp.Main', ['ngRoute'])

    .controller('MainCtrl', ['$rootScope', '$scope', '$window', '$translate', function ($rootScope, $scope, $window, $translate) {

        // $scope.baseUrl = 'https://hoopa.org/front-end/#!/';
        $scope.baseUrl = 'http://127.0.0.1:8000/#!/';
        // $scope.baseUrl = 'http://localhost/hoopa-front/app/#!/';

        $scope.languageShort = "English";

        $rootScope.customGoTo = function (route) {
            $window.location.href = $scope.baseUrl + route;
        };

        $rootScope.searchFilterText = '';

        $rootScope.displayAlert = function (type, message) {
            //type => 'success', 'info', 'warning', 'danger'
            $.notify({
                message: message
            }, {
                    type: type,
                    delay: 4000,
                    offset: {
                        y: 100,
                        x: 20
                    }
                });
        }

        $scope.setLanguage = function (lan) {
            switch (lan) {
                case 'cn_CN':
                    $scope.languageShort = "中文";
                    break;
                case 'en_EN':
                    $scope.languageShort = "English";
                    break;
                case 'es_ES':
                    $scope.languageShort = "Español";
                    break;
                default:
                    break;
            }
            $translate.use(lan);
        };

        // $scope.setLanguage('en_EN');

        $rootScope.shopCartArray = [];
        $rootScope.shopCartCount = 0;

        $rootScope.initWishList = function () {
            console.log('initWishList');
            // var id = $scope.projectId;
            var currentUser = AV.User.current();

            if(currentUser) {
                $rootScope.loginUser = true;

                var query = new AV.Query('ShopCar');
                query.equalTo('user', currentUser);
                query.include('image');
                query.include('project');

                query.count().then( count => {
                    $rootScope.shopCartCount = count;
                })

                query.limit(4);
                query.descending('createdAt');
                query.find().then(res => {
                    $scope.shopCartArray = res;
                    $scope.$apply();
                })
            }
        };

        $rootScope.loginUser = false;

        $rootScope.getUser = function () {
            var currentUser = AV.User.current();
            if (currentUser) {
                $rootScope.loginUser = true;
            } else {
                $rootScope.loginUser = false;
            }
        };

        $rootScope.getUser();

        $rootScope.initWishList();

        $scope.goToWishList = function(){
            $rootScope.customGoTo('wishlist');
        };

        $scope.search = function (searchFilterText) {
            $rootScope.searchFilterText = searchFilterText;
            $rootScope.customGoTo('projects');
            $rootScope.$broadcast('searchTextUpdated');
        }
    }]);