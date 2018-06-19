'use strict';

angular.module('myApp.News', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/news/:param1', {
      templateUrl: 'views/news/news.html',
      controller: 'NewsCtrl'
    });
  }])

  .controller('NewsCtrl', ['$rootScope', '$scope', '$routeParams', '$window', function ($rootScope, $scope, $routeParams, $window) {

    $rootScope.showBanner = false;
    $scope.activeSideBar = $routeParams.param1;

    $scope.news = [];
    $scope.newsPagination = 0;
    $scope.page = 1;
    $rootScope.activeList = 'news';
    $scope.skip = 0;
    $scope.pagNum = [];

    $scope.loading = false;

    $scope.init = function () {
      $scope.loading = true;

      var queryNewsCount = new AV.Query('News');
      queryNewsCount.count().then(function (count) {
        if (count >= 5) {
          if (count % 5 == 0) {
            $scope.newsPagination = parseInt(count / 5);
            for (var i = 1; i < $scope.newsPagination; i++) {
              $scope.pagNum[i - 1] = i;
            }
          } else {
            $scope.newsPagination = parseInt(count / 5) + 1;
            for (var i = 1; i <= $scope.newsPagination; i++) {
              $scope.pagNum[i - 1] = i;
            }
          }
        } else {
          $scope.newsPagination = 0;
        }
        $scope.$apply();
      });

      var queryNews = new AV.Query('News');
      queryNews.limit(5);
      queryNews.find().then(function (res) {
        $scope.news = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(720, 480);
          var title = element.get('title');
          var content = element.get('content');
          var id = element.id;

          $scope.news.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content
          })
          $scope.$apply();
        });

        $scope.loading = false;
        $scope.$apply();

      }).catch(function (error) {

        $scope.loading = false;
        $scope.$apply();
        alert(JSON.stringify(error));
      });
    };

    $scope.init();

    $scope.next = function () {
      // $scope.loading = true;
      $scope.page += 1;
      $scope.skip += 5;
      var queryNews = new AV.Query('News');
      queryNews.limit(5);
      queryNews.skip($scope.skip);
      queryNews.find().then(function (res) {
        $scope.news = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(720, 480);
          var title = element.get('title');
          var content = element.get('content');
          var id = element.id;

          $scope.news.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content
          })
          $('html,body').scrollTop(0);
          $scope.$apply();
        });

        // $scope.loading = false;
        $scope.$apply();

      }).catch(function (error) {

        $scope.loading = false;
        $scope.$apply();
        alert(JSON.stringify(error));
      });
    };

    $scope.previous = function () {
      if ($scope.skip >= 5) {
        $scope.page -= 1;
        // $scope.loading = true;

        $scope.skip -= 5;
        var queryNews = new AV.Query('News');
        queryNews.limit(5);
        queryNews.skip($scope.skip);
        queryNews.find().then(function (res) {
          $scope.news = [];
          res.forEach(function (element) {
            var mainImage = element.get('image').thumbnailURL(720, 480);
            var title = element.get('title');
            var content = element.get('content');
            var id = element.id;

            $scope.news.push({
              id: id,
              mainImage: mainImage,
              title: title,
              content: content
            })
            $('html,body').scrollTop(0);
            $scope.$apply();
          });

          // $scope.loading = false;
          $scope.$apply();

        }).catch(function (error) {

          $scope.loading = false;
          $scope.$apply();
          alert(JSON.stringify(error));
        });
      }
    };

    $scope.goToNews = function (index) {
      localStorageService.cookie.set('newsId', $scope.news[index].id);
      // $state.go('newsView');
    };

    $scope.deleteNews = function (id) {
      var news = AV.Object.createWithoutData('News', id);
      news.destroy().then(function (n) {
        $scope.init();
      })
    };

    $scope.ChangeNews = function (num) {
      $scope.activeSideBar = num;
    };

    $scope.goToPage = function (n) {
      // $scope.loading = true;
      $scope.page = n;

      $scope.skip = ((n - 1) * 5);
      var queryNews = new AV.Query('News');
      queryNews.limit(5);
      queryNews.skip($scope.skip);
      queryNews.find().then(function (res) {
        $scope.news = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(720, 480);
          var title = element.get('title');
          var content = element.get('content');
          var id = element.id;

          $scope.news.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content
          })
          $('html,body').scrollTop(0);
          $scope.$apply();
        });

        // $scope.loading = false;
        $scope.$apply();

      }).catch(function (error) {

        $scope.loading = false;
        $scope.$apply();
        alert(JSON.stringify(error));
      });
    };

    $scope.goToProject = function (id) {
      $window.location.href = 'http://localhost/hoopa-front/app/#!/viewNews/' + id;
    };

  }]);