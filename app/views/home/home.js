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
    $rootScope.divBottomLiActive = 'HOME';

    $scope.news = [];
    $scope.industryNews = [];

    $scope.goToProject = function (id) {
      $rootScope.customGoTo('project-details/' + id);
    };

    $scope.limitNews = 3;

    if ($(window).width() >= 1200) {
      $scope.limitNews = 3;
    } else if ($(window).width() >= 768) {
      $scope.limitNews = 2;
    } else {
      $scope.limitNews = 3;
    }

    $(window).on("resize.doResize", function () {
      $scope.$apply(function () {
        if ($(window).width() >= 1200) {
          $scope.limitNews = 3;
        } else if ($(window).width() >= 768) {
          $scope.limitNews = 2;
        } else {
          $scope.limitNews = 3;
        }
      });
    });

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
          var titleMin = element.get('title');
          var content = element.get('content');
          var contentMin = element.get('content');
          var id = element.id;

          if (titleMin.length >= 25) {
            var tit = '';
            for (var x = 0; x < 25; x++) {
              tit = tit + titleMin[x];
            }
            tit = tit + "...";
            titleMin = tit;
          }

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
            titleMin: titleMin,
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
          var titleMin = element.get('title');
          var content = element.get('content');
          var contentMin = element.get('content');
          var id = element.id;

          if (titleMin.length >= 25) {
            var tit = '';
            for (var x = 0; x < 25; x++) {
              tit = tit + titleMin[x];
            }
            tit = tit + "...";
            titleMin = tit;
          }

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
            titleMin: titleMin,
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