'use strict';

angular.module('myApp.Projects', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {
      templateUrl: 'views/projects/projects.html',
      controller: 'ProjectsCtrl'
    });
  }])

  .controller('ProjectsCtrl', ['$rootScope', '$scope', '$routeParams', '$window', '$translate', function ($rootScope, $scope, $routeParams, $window, $translate) {

    $rootScope.showBanner = false;

    $scope.products = [];

    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.productsCount = 0;

    $scope.phoneNumber = '';
    $scope.smsCode = '';

    $scope.provinces = ['区域无限制', '安徽省', '北京市', '重庆市', '福建省', '广东省', '甘肃省', '广西壮族自治区', '贵州省', '河南省', '湖北省', '河北省','海南省', '香港特别行政区', '黑龙江省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '澳门特别行政区', '內蒙古自治区','宁夏回族自治区', '青海省', '四川省', '山东省', '上海市', '陕西省', '山西省', '天津市', '台湾省', '新疆维吾尔自治区','西藏自治区', '云南省', '浙江省'];

    $scope.typeArrivalArray = ['抵押物类型', '住宅', '商铺', '写字楼', '厂房', '在建工程', '机械设备，存货，原材料', '土地（无厂房',      '林权', '海城使用权', '商住', '无抵押', '其他'];

    $scope.amountArray = ['本金无限制', '500万', '500-1000万', '1000-1500万', '1500-2000万', '2000-2500万', '2500-3000万', '3000-3500万','3500-4000万', '4000-4500万', '4500-5000万', '5000-5500万', '5500-6000万', '6000万'];

    $scope.filters = {
      province: '区域无限制',
      type: '抵押物类型',
      amount: '本金无限制',
      text: ''
    };

    $scope.resetFilters = function () {
      $rootScope.searchFilterText = '';

      $scope.filters = {
        province: '区域无限制',
        type: '抵押物类型',
        amount: '本金无限制',
        text: '',
      };
    };

    $scope.$on("searchTextUpdated", function(evt, data) { 
      $scope.filters.text = $rootScope.searchFilterText;
      $scope.applyFilters();
    });

    $scope.applyFilters = function () {
      
      $scope.products = [];
      var currentUser = AV.User.current();

      var queryType = new AV.Query('Project')
      if ($scope.filters.type != '抵押物类型') {
        queryType.contains('typeArrivalString', $scope.filters.type)
      }

      var queryProvince = new AV.Query('Project');
      if ($scope.filters.province != '区域无限制') {
        queryProvince.contains('provinceString', $scope.filters.province);
      }

      var query = '';
      switch ($scope.filters.amount) {
        case '本金无限制':
          query = new AV.Query('Project');
          break;
        case '500万':
          query = new AV.Query('Project');
          query.lessThanOrEqualTo('debitAmount', 500);
          break;
        case '500-1000万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 500);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 1000);
          var query = AV.Query.and(query2, query1);
          break;
        case '1000-1500万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 1000);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 1500);
          var query = AV.Query.and(query2, query1);
          break;
        case '1500-2000万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 1500);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 2000);
          var query = AV.Query.and(query2, query1);
          break;
        case '2000-2500万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 2000);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 2500);
          var query = AV.Query.and(query2, query1);
          break;
        case '2500-3000万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 2500);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 3000);
          var query = AV.Query.and(query2, query1);
          break;
        case '3000-3500万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 3000);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 3500);
          var query = AV.Query.and(query2, query1);
          break;
        case '3500-4000万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 3500);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 4000);
          var query = AV.Query.and(query2, query1);
          break;
        case '4000-4500万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 4000);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 4500);
          var query = AV.Query.and(query2, query1);
          break;
        case '4500-5000万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 4500);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 5000);
          var query = AV.Query.and(query2, query1);
          break;
        case '5000-5500万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 5000);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 5500);
          var query = AV.Query.and(query2, query1);
          break;
        case '5500-6000万':
          var query2 = new AV.Query('Project');
          query2.greaterThan('debitAmount', 5500);
          var query1 = new AV.Query('Project');
          query1.lessThanOrEqualTo('debitAmount', 6000);
          var query = AV.Query.and(query2, query1);
          break;
        case '6000万':
          query = new AV.Query('Project');
          query.greaterThan('debitAmount', 6000);
          break;
        default:
          query = new AV.Query('Project');
          break;
      }

      var queryAnd = AV.Query.and(queryProvince, query, queryType);

      var queryProjectTitle = new AV.Query('Project')
      queryProjectTitle.contains('title', $scope.filters.text)

      var queryDescription = new AV.Query('Project')
      queryDescription.contains('description', $scope.filters.text)

      var compoundQuery = AV.Query.or(queryDescription, queryProjectTitle)
      var queryAndSearchBar = AV.Query.and(queryAnd, compoundQuery);

      queryAndSearchBar.count().then(function (count) {
        $scope.productsCount = count;
      });

      queryAndSearchBar.limit($scope.pageSize);
      queryAndSearchBar.skip(($scope.currentPage - 1) * $scope.pageSize);
      queryAndSearchBar.descending('createdAt')
      queryAndSearchBar.find().then(function (products) {

        products.forEach(function (product, index) {

          var productId = product.id;
          var productTitle = product.get('title');
          var productT = productTitle;
          if (productTitle.length > 25) {
            productT = ''
            for (var i = 0; i < 25; i++) {
              productT += productTitle[i];
            }
            productT += "...";
          }
          productTitle = productT;

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
            wished: false
            // imCreator: (ownerUsername == currentUser.get('username')),
          })

          if (currentUser) {
            $scope.setWish($scope.products, index, product, currentUser);
          }

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
    };

    $scope.applyFiltersClick = function () {
      $scope.currentPage = 1;
      $scope.applyFilters();
    };

    $scope.setWish = function (array, index, project, user) {
      var query = new AV.Query("ShopCar")
      query.equalTo('project', project);
      query.equalTo('user', user);
      query.count().then(res => {
        if (res > 0) {
          array[index].wished = true;
        }
        $scope.$apply();
      });
    };

    $scope.applyFilters();

    $scope.begin = function () {
      $scope.currentPage = 1;
      $scope.applyFilters();
      $('html,body').scrollTop(0);
    };

    $scope.end = function () {
      var quotient = Math.floor($scope.productsCount / $scope.pageSize);
      var remainder = $scope.productsCount % $scope.pageSize;

      $scope.currentPage = quotient;
      if (remainder > 0) {
        $scope.currentPage = quotient + 1;
      }
      $scope.applyFilters();
      $('html,body').scrollTop(0);
    };

    $scope.nextPage = function () {
      var quotient = Math.floor($scope.productsCount / $scope.pageSize);
      var remainder = $scope.productsCount % $scope.pageSize;

      if ($scope.currentPage == quotient) {
        if (remainder > 0) {
          $scope.currentPage = quotient + 1;
        }
      }

      if ($scope.currentPage < quotient) {
        $scope.currentPage = $scope.currentPage + 1;
      }
      $scope.applyFilters();
      $('html,body').scrollTop(0);
    };

    $scope.previousPage = function () {
      if ($scope.currentPage > 1) {
        $scope.currentPage = $scope.currentPage - 1;
        $scope.applyFilters();
      }
      $('html,body').scrollTop(0);
    };

    $scope.goToProject = function (id) {
      $rootScope.customGoTo('project-details/' + id);
    };

    $scope.addToWhishList = function (id) {
      var currentUser = AV.User.current();

      if (currentUser) {
        var project = AV.Object.createWithoutData('Project', id);

        var query = new AV.Query("ShopCar")
        query.equalTo('project', project);
        query.equalTo('user', currentUser);
        query.count().then(res => {
          if (res > 0) {
            var alreadyInWishList = $translate.instant('ALREADYINWISHLIST');
            $rootScope.displayAlert('warning', alreadyInWishList);
          } else {
            var shop = new AV.Object('ShopCar');
            shop.set('user', currentUser);
            shop.set('checked', false);
            shop.set('project', project);
            shop.save().then(res => {
              var addedWishList= $translate.instant('ADDEDWISHLIST');
              $rootScope.displayAlert('success', addedWishList);
              $scope.applyFilters();
            });
          }
        });

      } else {
        $rootScope.customGoTo('login/projects');
      }
    };

    $scope.removeToWhishList = function(id){
      var currentUser = AV.User.current();

      if (currentUser) {
        var project = AV.Object.createWithoutData('Project', id);

        var query = new AV.Query("ShopCar")
        query.equalTo('project', project);
        query.equalTo('user', currentUser);
        query.find().then( res => {
          res.forEach(function(element){
            element.destroy();
            var removeWishList= $translate.instant('REMOVEDWISHLIST');
            $rootScope.displayAlert('success', removeWishList);
          });

          $scope.applyFilters();
        })
      }
    };
  }]);