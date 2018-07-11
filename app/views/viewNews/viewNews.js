'use strict';

angular.module('myApp.ViewNews', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewNews/:param1', {
            templateUrl: 'views/viewNews/viewNews.html',
            controller: 'ViewNewsCtrl'
        });
    }])

    .controller('ViewNewsCtrl', ['$rootScope', '$scope', '$routeParams', '$translate', function ($rootScope, $scope, $routeParams, $translate) {

        $rootScope.showBanner = false;
        $rootScope.divBottomLiActive = 'NEWS';

        $scope.new = {};
        $scope.news = [];
        $scope.projects = [];
        $scope.date = "";
        $scope.newsMedia = [];
        $scope.projectId = $routeParams.param1;

        $scope.getMonth =  function(monthNum){
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
            var query = new AV.Query("News")
            query.get($scope.projectId).then(function (n) {
                $scope.new = n;

                $scope.date = n.createdAt;

                var queryMedias = new AV.Query("NewsMedia")
                queryMedias.equalTo('news', n)
                queryMedias.find().then(function (mediasObject) {
                    $scope.newsMedia = mediasObject;
                    $scope.$apply();
                })

                $scope.$apply();
            })

            var queryNews = new AV.Query('News');
            queryNews.limit(5);
            queryNews.find().then(function (res) {
                $scope.news = [];
                res.forEach(function (element) {
                    var mainImage = element.get('image').thumbnailURL(60, 40);
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
                    $scope.$apply();
                });
                $scope.$apply();

            }).catch(function (error) {
                alert(JSON.stringify(error));
            });

            var queryProjects = new AV.Query('Project');
            queryProjects.limit(5);
            queryProjects.equalTo('isRecommended', true);
            queryProjects.find().then(function (res) {
                $scope.projects = [];
                res.forEach(function (element) {
                    var mainImage = element.get('image').thumbnailURL(260, 160);
                    // var title = element.get('title');
                    // var content = element.get('content');
                    var id = element.id;

                    $scope.projects.push({
                        id: id,
                        mainImage: mainImage
                        // title: title,
                        // content: content
                    })
                    $scope.$apply();
                });
                $scope.$apply();

            }).catch(function (error) {
                alert(JSON.stringify(error));
            });
        };

        $scope.init();

        $scope.goToNew = function (id) {
            $rootScope.customGoTo('viewNews/' + id);
        };

        $scope.goToNews= function () {
            $rootScope.customGoTo('news/1');
        };

        $scope.goToProject= function (id) {
            console.log(id);
            // $rootScope.customGoTo('news/1');
        };

    }]);