'use strict';

angular.module('myApp.Offers', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/offers', {
            templateUrl: 'views/offers/offers.html',
            controller: 'OffersCtrl'
        });
    }])

    .controller('OffersCtrl', ['$rootScope', '$scope', '$routeParams', '$translate', function ($rootScope, $scope, $routeParams, $translate) {

        $('html,body').scrollTop(0);

        $rootScope.showBanner = false;
        $rootScope.divBottomLiActive = 'ASSETS';
        $scope.shopCartArray = [];

        $scope.init = function () {
            var currentUser = AV.User.current();

            if (currentUser) {
                var query = new AV.Query('Offert');
                query.equalTo('user', currentUser);
                query.include('project');
                query.descending('createdAt');
                query.find().then(function(res) {
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
    }]);