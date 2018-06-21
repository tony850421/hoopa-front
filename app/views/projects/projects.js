'use strict';

angular.module('myApp.Projects', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {
      templateUrl: 'views/projects/projects.html',
      controller: 'ProjectsCtrl'
    });
  }])

  .controller('ProjectsCtrl', ['$rootScope', '$scope', '$routeParams', '$window', function ($rootScope, $scope, $routeParams, $window) {

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
          if (productDescription.length > 50) {
            productDesc = ''
            for (var i = 0; i < 50; i++) {
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
            productImageUrl = productImage.thumbnailURL(320, 200);
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

    $scope.goToProject = function (id) {
      console.log('goToProject: ' + 'project-details/' + id);
      $rootScope.customGoTo('project-details/' + id);
    };

  }]);