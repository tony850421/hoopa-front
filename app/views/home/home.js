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
    $scope.productsShop = [];
    $scope.productsFactory = [];
    $scope.productsHouse = [];
    $scope.productsHot = [];

    $scope.projectActive = 1;

    $scope.fetchProjectHot = function () {
      var query = new AV.Query('Project');
      query.equalTo('isHot', true);
      query.limit('4');
      query.descending('createdAt');
      query.find().then(function (res) {
        // var arrivalType = [];
        for (var i = 0; i < res.length; i++) {
          // var typeArr = res[i].get('typeArrivalString');
          // arrivalType = typeArr.split('+');
          // arrivalType.splice(0, 1);

          // if (res[i].get('title').length >= 15) {
          //   var title = '';
          //   for (var x = 0; x < 14; x++) {
          //     title = title + res[i].get('title')[x];
          //   }
          //   title = title + "...";
          //   res[i].set('title', title);
          // }

          if (res[i].get('description').length >= 50) {
            var desc = '';
            for (var x = 0; x < 50; x++) {
              desc = desc + res[i].get('description')[x];
            }
            desc = desc + "...";
            res[i].set('description', desc);
          }

          res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);

          // var arrivalTypeTags = [];

          // for (var x = 0; x < arrivalType.length; x++) {
          //   var flag = false;
          //   for (var t = 0; t < arrivalTypeTags.length; t++) {
          //     if (arrivalType[x] == arrivalTypeTags[t]) {
          //       flag = true;
          //     }
          //   }
          //   if (!flag) {
          //     arrivalTypeTags.push(arrivalType[x])
          //   }
          // }

          // res[i].set('tags', arrivalTypeTags)
        }

        $scope.productsHot = res;
        $scope.$apply();
      });
    };

    $scope.fetchProjectHouse = function () {
      var query = new AV.Query('Project');
      query.equalTo('isHouse', true);
      query.limit('4');
      query.descending('createdAt');
      query.find().then(function (res) {
        // var arrivalType = [];
        for (var i = 0; i < res.length; i++) {
          // var typeArr = res[i].get('typeArrivalString');
          // arrivalType = typeArr.split('+');
          // arrivalType.splice(0, 1);

          // if (res[i].get('title').length >= 15) {
          //   var title = '';
          //   for (var x = 0; x < 14; x++) {
          //     title = title + res[i].get('title')[x];
          //   }
          //   title = title + "...";
          //   res[i].set('title', title);
          // }

          if (res[i].get('description').length >= 50) {
            var desc = '';
            for (var x = 0; x < 50; x++) {
              desc = desc + res[i].get('description')[x];
            }
            desc = desc + "...";
            res[i].set('description', desc);
          }

          res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);

          // var arrivalTypeTags = [];

          // for (var x = 0; x < arrivalType.length; x++) {
          //   var flag = false;
          //   for (var t = 0; t < arrivalTypeTags.length; t++) {
          //     if (arrivalType[x] == arrivalTypeTags[t]) {
          //       flag = true;
          //     }
          //   }
          //   if (!flag) {
          //     arrivalTypeTags.push(arrivalType[x])
          //   }
          // }

          // res[i].set('tags', arrivalTypeTags)
        }

        $scope.productsHouse = res;
        $scope.$apply();
      });
    };

    $scope.fetchProjectFactory = function () {
      var query = new AV.Query('Project');
      query.equalTo('isFactory', true);
      query.limit('4');
      query.descending('createdAt');
      query.find().then(function (res) {
        // var arrivalType = [];
        for (var i = 0; i < res.length; i++) {
          // var typeArr = res[i].get('typeArrivalString');
          // arrivalType = typeArr.split('+');
          // arrivalType.splice(0, 1);

          // if (res[i].get('title').length >= 15) {
          //   var title = '';
          //   for (var x = 0; x < 14; x++) {
          //     title = title + res[i].get('title')[x];
          //   }
          //   title = title + "...";
          //   res[i].set('title', title);
          // }

          if (res[i].get('description').length >= 50) {
            var desc = '';
            for (var x = 0; x < 50; x++) {
              desc = desc + res[i].get('description')[x];
            }
            desc = desc + "...";
            res[i].set('description', desc);
          }

          res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);

          // var arrivalTypeTags = [];

          // for (var x = 0; x < arrivalType.length; x++) {
          //   var flag = false;
          //   for (var t = 0; t < arrivalTypeTags.length; t++) {
          //     if (arrivalType[x] == arrivalTypeTags[t]) {
          //       flag = true;
          //     }
          //   }
          //   if (!flag) {
          //     arrivalTypeTags.push(arrivalType[x])
          //   }
          // }

          // res[i].set('tags', arrivalTypeTags)
        }

        $scope.productsFactory = res;
        $scope.$apply();
      });
    };

    $scope.fetchProjectShop = function () {
      var query = new AV.Query('Project');
      query.equalTo('isShop', true);
      query.limit('4');
      query.descending('createdAt');
      query.find().then(function (res) {
        // var arrivalType = [];
        for (var i = 0; i < res.length; i++) {
          // var typeArr = res[i].get('typeArrivalString');
          // arrivalType = typeArr.split('+');
          // arrivalType.splice(0, 1);

          // if (res[i].get('title').length >= 15) {
          //   var title = '';
          //   for (var x = 0; x < 14; x++) {
          //     title = title + res[i].get('title')[x];
          //   }
          //   title = title + "...";
          //   res[i].set('title', title);
          // }

          if (res[i].get('description').length >= 50) {
            var desc = '';
            for (var x = 0; x < 50; x++) {
              desc = desc + res[i].get('description')[x];
            }
            desc = desc + "...";
            res[i].set('description', desc);
          }

          res[i].mainImage = res[i].get('image').thumbnailURL(320, 200);

          // var arrivalTypeTags = [];

          // for (var x = 0; x < arrivalType.length; x++) {
          //   var flag = false;
          //   for (var t = 0; t < arrivalTypeTags.length; t++) {
          //     if (arrivalType[x] == arrivalTypeTags[t]) {
          //       flag = true;
          //     }
          //   }
          //   if (!flag) {
          //     arrivalTypeTags.push(arrivalType[x])
          //   }
          // }

          // res[i].set('tags', arrivalTypeTags)
        }

        $scope.productsShop = res;
        $scope.$apply();
      });
    };

    $scope.changeActive = function (num) {
      $scope.projectActive = num;
      switch (num) {
        case 1:
          $scope.fetchProjectHot();
          break;
        case 2:
          $scope.fetchProjectHouse();
          break;
        case 3:
          $scope.fetchProjectFactory();
          break;
        case 4:
          $scope.fetchProjectShop();
          break;
        default:
          $scope.fetchProjectHot();
          break;
      }
    };

    $scope.changeActive(1);

    $scope.goToProject = function (id) {
      $rootScope.customGoTo('project-details/' + id);
    };

    $(window).load('/app/views/home/home.js', function () {
      $("span.rn-carousel-control-next").addClass("icon-next");
      $("span.rn-carousel-control-prev").addClass("icon-previous");
    });

  }]);