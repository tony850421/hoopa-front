'use strict';

angular.module('myApp.Home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    $rootScope.showBanner = true;
    // $scope.productsShop = [];
    // $scope.productsFactory = [];
    // $scope.productsHouse = [];
    // $scope.productsHot = [];

    $scope.news = [];
    $scope.industryNews = [];

    // $scope.projectActive = 1;

    // $scope.fetchProjectHot = function () {
    //   var query = new AV.Query('Project');
    //   query.equalTo('isHot', true);
    //   query.limit('4');
    //   query.descending('createdAt');
    //   query.find().then(function (res) {
    //     for (var i = 0; i < res.length; i++) {

    //       if (res[i].get('description').length >= 50) {
    //         var desc = '';
    //         for (var x = 0; x < 50; x++) {
    //           desc = desc + res[i].get('description')[x];
    //         }
    //         desc = desc + "...";
    //         res[i].set('description', desc);
    //       }

    //       res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);
    //     }

    //     $scope.productsHot = res;
    //     $scope.$apply();
    //   });
    // };

    // $scope.fetchProjectHouse = function () {
    //   var query = new AV.Query('Project');
    //   query.equalTo('isHouse', true);
    //   query.limit('4');
    //   query.descending('createdAt');
    //   query.find().then(function (res) {
    //     for (var i = 0; i < res.length; i++) {

    //       if (res[i].get('description').length >= 50) {
    //         var desc = '';
    //         for (var x = 0; x < 50; x++) {
    //           desc = desc + res[i].get('description')[x];
    //         }
    //         desc = desc + "...";
    //         res[i].set('description', desc);
    //       }

    //       res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);
    //     }

    //     $scope.productsHouse = res;
    //     $scope.$apply();
    //   });
    // };

    // $scope.fetchProjectFactory = function () {
    //   var query = new AV.Query('Project');
    //   query.equalTo('isFactory', true);
    //   query.limit('4');
    //   query.descending('createdAt');
    //   query.find().then(function (res) {
    //     for (var i = 0; i < res.length; i++) {

    //       if (res[i].get('description').length >= 50) {
    //         var desc = '';
    //         for (var x = 0; x < 50; x++) {
    //           desc = desc + res[i].get('description')[x];
    //         }
    //         desc = desc + "...";
    //         res[i].set('description', desc);
    //       }

    //       res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);
    //     }

    //     $scope.productsFactory = res;
    //     $scope.$apply();
    //   });
    // };

    // $scope.fetchProjectShop = function () {
    //   var query = new AV.Query('Project');
    //   query.equalTo('isShop', true);
    //   query.limit('4');
    //   query.descending('createdAt');
    //   query.find().then(function (res) {
    //     for (var i = 0; i < res.length; i++) {

    //       if (res[i].get('description').length >= 50) {
    //         var desc = '';
    //         for (var x = 0; x < 50; x++) {
    //           desc = desc + res[i].get('description')[x];
    //         }
    //         desc = desc + "...";
    //         res[i].set('description', desc);
    //       }

    //       res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);
    //     }

    //     $scope.productsShop = res;
    //     $scope.$apply();
    //   });
    // };

    // $scope.changeActive = function (num) {
    //   $scope.projectActive = num;
    //   switch (num) {
    //     case 1:
    //       $scope.fetchProjectHot();
    //       break;
    //     case 2:
    //       $scope.fetchProjectHouse();
    //       break;
    //     case 3:
    //       $scope.fetchProjectFactory();
    //       break;
    //     case 4:
    //       $scope.fetchProjectShop();
    //       break;
    //     default:
    //       $scope.fetchProjectHot();
    //       break;
    //   }
    // };

    // $scope.changeActive(1);

    $scope.goToProject = function (id) {
      $rootScope.customGoTo('project-details/' + id);
    };

    $scope.fetchNews = function () {
      var queryNews = new AV.Query('News');
      queryNews.limit(3);
      queryNews.descending('createdAt');
      queryNews.equalTo('type', '0');
      queryNews.find().then(function (res) {
        $scope.news = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(300, 200);
          var title = element.get('title');
          var content = element.get('content');
          var contentMin = element.get('content');
          var id = element.id;

          if (contentMin.length >= 48) {
            var desc = '';
            for (var x = 0; x < 48; x++) {
              desc = desc + contentMin[x];
            }
            desc = desc + "...";
            contentMin = desc;
          }

          $scope.news.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content,
            contentMin: contentMin
          })
          $scope.$apply();
        });
        $scope.$apply();

      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    };

    $scope.fetchNews();


    $scope.goToNews = function (id) {
      $rootScope.customGoTo('viewNews/' + id);
    };


    $scope.fetchIndustryNews = function () {
      var queryNews = new AV.Query('News');
      queryNews.limit(4);
      queryNews.descending('createdAt');
      queryNews.equalTo('type', '1');
      queryNews.find().then(function (res) {
        $scope.industryNews = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(300, 200);
          var title = element.get('title');
          var content = element.get('content');
          var contentMin = element.get('content');
          var id = element.id;

          if (contentMin.length >= 48) {
            var desc = '';
            for (var x = 0; x < 48; x++) {
              desc = desc + contentMin[x];
            }
            desc = desc + "...";
            contentMin = desc;
          }

          $scope.industryNews.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content,
            contentMin: contentMin
          })
          $scope.$apply();
        });
        $scope.$apply();

      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    };

    $scope.fetchIndustryNews();
  }]);