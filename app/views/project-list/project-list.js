'use strict';

angular.module('myApp.ProjectList', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project-list', {
      templateUrl: 'views/project-list/project-list.html',
      controller: 'ProjectListCtrl'
    });
  }])

  .controller('ProjectListCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $rootScope.showBanner = false;

    $scope.products = [];
    $scope.skip = 0;

    $scope.listAllProjects = function () {
      $scope.products = [];

      // var currentUser = AV.User.current();

      // if (currentUser) {

        // $scope.loading = true;

        var query = new AV.Query('Project');
        query.include('creator');
        query.include('image');
        query.descending('createdAt');
        query.limit(8);
        query.find().then(function (products) {
          products.forEach(function (product) {

            console.log(products);

            var productId = product.id;
            var productTitle = product.get('title');
            var productDescription = product.get('description');
            var productDesc = productDescription;
            if (productDescription.length > 170) {
              productDesc = ''
              for (var i = 0; i < 170; i++) {
                productDesc += productDescription[i];
              }
              productDesc += "...";
            }
            productDescription = productDesc;

            var releaseTime = (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate() + '/' + product.createdAt.getFullYear();
            var ownerUsername = product.get('creator').get('username');
            var productImage = product.get('image');
            var productAmount = product.get('debitAmount');
            var productAddress = product.get('plainAddress');
            var productImageUrl;
            if (productImage) {
              productImageUrl = productImage.thumbnailURL(500, 750);
            } else {
              productImageUrl = 'img/LogoHoopa.png';
            }
            // handlebars context
            $scope.products.push({
              id: productId,
              imageUrl: productImageUrl,
              title: productTitle,
              description: productDescription,
              debitAmount: productAmount,
              plainAddress: productAddress,
              ownerUsername: ownerUsername,
              releaseTime: releaseTime,
              // imCreator: (ownerUsername == currentUser.get('username')),
            })
            $scope.$apply();
          });

          $scope.loading = false;
          $scope.$apply();

        }).catch(function (error) {

          $scope.loading = false;
          $scope.$apply();
          // alert(JSON.stringify(error));
          console.log(error);
        });

      // } else {
      //   $window.location.href = '#/login';
      // }
    };

    $scope.listAllProjects();

  }]);