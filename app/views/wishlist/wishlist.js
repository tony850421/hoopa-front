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

        $scope.shopCartArray = [];

        // $scope.projectId = $routeParams.id;

        $scope.init = function () {
            // var id = $scope.projectId;
            var currentUser = AV.User.current();

            if(currentUser) {
                var query = new AV.Query('ShopCar');
                query.equalTo('user', currentUser);
                query.include('image');
                query.include('project');
                query.descending('createdAt');
                query.find().then(res => {
                    
                    

                    for (var i=0; i<res.length; i++){
                        var aux = res[i].get('project').get('description');
                        if (res[i].get('project').get('description').length > 30){
                            aux = '';
                            for (var t=0; t<30; t++){
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