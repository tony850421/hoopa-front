'use strict';

angular.module('myApp.News', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/news/:param1', {
      templateUrl: 'views/news/news.html',
      controller: 'NewsCtrl'
    });
  }])

  .controller('NewsCtrl', ['$rootScope', '$scope', '$routeParams', '$window', '$translate', function ($rootScope, $scope, $routeParams, $window, $translate) {

    $rootScope.showBanner = false;
    $rootScope.divBottomLiActive = 'NEWS';
    $scope.activeSideBar = $routeParams.param1;

    $scope.newsCount = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.news = [];
    $scope.newsPagination = 0;
    $scope.page = 1;
    $rootScope.activeList = 'news';
    $scope.skip = 0;
    $scope.pagNum = [];

    $scope.loading = false;

    $scope.getMonth = function (monthNum) {
      $scope.month = new Array();
      $scope.month[0] = $translate.instant('JANUARY');
      $scope.month[1] = $translate.instant('FEBRUARY');
      $scope.month[2] = $translate.instant('MARCH');
      $scope.month[3] = $translate.instant('APRIL');
      $scope.month[4] = $translate.instant('MAY');
      $scope.month[5] = $translate.instant('JUNE');
      $scope.month[6] = $translate.instant('JULY');
      $scope.month[7] = $translate.instant('AUGUST');
      $scope.month[8] = $translate.instant('SEPTEMBER');
      $scope.month[9] = $translate.instant('OCTOBER');
      $scope.month[10] = $translate.instant('NOVEMBER');
      $scope.month[11] = $translate.instant('DECEMBER');

      return $scope.month[monthNum];

    };

    $scope.init = function () {
      $scope.loading = true;

      var queryNewsCount = new AV.Query('News');
      queryNewsCount.equalTo('type', $scope.activeSideBar);
      queryNewsCount.count().then(function (count) {
        $scope.newsCount = count;
        $scope.$apply();
      });

      var queryNews = new AV.Query('News');
      queryNews.limit(5);
      queryNews.equalTo('type', $scope.activeSideBar);
      queryNews.descending('createdAt');
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

    $scope.nextPage = function () {
      var remainder = $scope.newsCount % $scope.pageSize;
      var quotient = 0;
      if (remainder == 0){
        quotient = Math.floor($scope.newsCount / $scope.pageSize);
      } else{
        quotient = Math.floor($scope.newsCount / $scope.pageSize) + 1;
      } 

      if ($scope.currentPage < quotient) {        
        $scope.goToPagination();

        if ($scope.currentPage == quotient) {
          if (remainder > 0) {
            $scope.currentPage = quotient + 1;
          }
        }
  
        if ($scope.currentPage < quotient) {
          $scope.currentPage = $scope.currentPage + 1;
        }
      }      
    };

    $scope.previousPage = function () {
      if ($scope.currentPage > 1) {
        $scope.currentPage = $scope.currentPage - 1;
        $scope.goToPagination();
      }
    };

    $scope.begin = function () {
      $scope.init();
      $('html,body').scrollTop(0);
    };

    $scope.end = function () {
      var quotient = Math.floor($scope.newsCount / $scope.pageSize);
      var remainder = $scope.newsCount % $scope.pageSize;

      $scope.currentPage = quotient;
      if (remainder > 0) {
        $scope.currentPage = quotient + 1;
      }
      $scope.goToPagination();
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

    $scope.goToProject = function (id) {
      $rootScope.customGoTo('viewNews/' + id);
    };

    $scope.goToPagination = function () {
      var queryNews = new AV.Query('News');
      queryNews.limit(5);
      queryNews.equalTo('type', $scope.activeSideBar);
      queryNews.descending('createdAt');
      queryNews.skip(($scope.currentPage - 1) * 5);
      queryNews.find().then(function (res) {
        $scope.news = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(720, 480);
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
          })
          $('html,body').scrollTop(0);
          $scope.$apply();
        });

        $scope.$apply();

      }).catch(function (error) {
        $scope.loading = false;
        $scope.$apply();
        alert(JSON.stringify(error));
      });
    };

  }]);