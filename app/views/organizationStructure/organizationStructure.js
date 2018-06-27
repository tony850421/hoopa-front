'use strict';

angular.module('myApp.OrganizationStructure', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/organizationStructure', {
      templateUrl: 'views/organizationStructure/organizationStructure.html',
      controller: 'OrganizationStructureCtrl'
    });
  }])

  .controller('OrganizationStructureCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $rootScope.showBanner = false;
    
    $scope.projects = [];

    $scope.init = function () {

      var queryProjects = new AV.Query('Project');
      queryProjects.limit(5);
      queryProjects.equalTo('isRecommended', true);
      queryProjects.find().then(function (res) {
        $scope.projects = [];
        res.forEach(function (element) {
          var mainImage = element.get('image').thumbnailURL(260, 160);
          var title = element.get('title');
          var amount = element.get('debitAmount');
          var id = element.id;

          $scope.projects.push({
            id: id,
            mainImage: mainImage,
            title: title,
            amount: amount
          })
          $scope.$apply();
        });
        $scope.$apply();

      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    };

    $scope.init();
  }])