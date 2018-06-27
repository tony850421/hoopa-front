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

    $scope.month = new Array();
    $scope.month[0] = "January";
    $scope.month[1] = "February";
    $scope.month[2] = "March";
    $scope.month[3] = "April";
    $scope.month[4] = "May";
    $scope.month[5] = "June";
    $scope.month[6] = "July";
    $scope.month[7] = "August";
    $scope.month[8] = "September";
    $scope.month[9] = "October";
    $scope.month[10] = "November";
    $scope.month[11] = "December";

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

        res.forEach(function (element, index) {
          var mainImage = element.get('image').thumbnailURL(360, 240);
          var title = element.get('title');
          var content = element.get('content');
          var id = element.id;
          var date = element.get('createdAt');

          $scope.news.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content,
            date: date
          });

          $scope.getNewsMedia(element, $scope.news, index);

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

    $scope.getNewsMedia = function (newObject, newsList, index) {
      var newsMedia = [];
      var queryMedias = new AV.Query("NewsMedia")
      queryMedias.equalTo('news', newObject)
      queryMedias.find().then(function (mediasObject) {
        mediasObject.forEach(function (n) {
          if (n.get('image')) {
            var image = n.get('image').thumbnailURL(360, 240);
            newsMedia.push({
              image: image
            });
          }
        });
        newsList[index].newsMedia = newsMedia;
        $scope.$apply();
      })
    };

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
      $rootScope.customGoTo('viewNews/' + id);
    };

  }]);