'use strict';

angular.module('myApp.ProjectDetails', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/project-details/:id', {
      templateUrl: 'views/project-details/project-details.html',
      controller: 'ProjectDetailsCtrl'
    });
  }])

  .controller('ProjectDetailsCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

    $rootScope.showBanner = false;

    $scope.tabCommentsVisible = false;
    $scope.projectId = $routeParams.id;

    $scope.project = {};
    $scope.sponsorsList = [];
    $scope.assetsList = [];
    $scope.borrowerList = [];
    $scope.imageList = [];
    $scope.imageOpenModal = 0;
    $scope.countVisit = 0;
    $scope.countOffers = 0;
    $scope.countShopCar = 0;
    $rootScope.activeList = 'projects';

    $scope.projectTitle = '';
    $scope.projectCompany = '';
    $scope.projectDescription = '';
    $scope.projectDebitAmount = '';
    $scope.projectPrincipal = '';
    $scope.projectComeFrom = '';
    $scope.projectProvince = '';
    $scope.projectAddress = '';
    $scope.projectCredits = '';
    $scope.projectManagerId = '';
    $scope.projectManagerName = '';
    $scope.projectManagerPhone = '';

    $scope.projectHot = false;
    $scope.projectHouse = false;
    $scope.projectRecommended = false;
    $scope.projectFactory = false;
    $scope.projectDebt = false;
    $scope.projectShop = false;

    $scope.init = function () {
        var id = $scope.projectId;

        var query = new AV.Query("Project")
        query.include('projectManager')
        query.get(id).then(function (p) {

            $scope.project = p;

            $scope.projectTitle = p.get('title');
            $scope.projectCompany = p.get('companyName');
            $scope.projectDescription = p.get('description');
            $scope.projectDebitAmount = p.get('debitAmount');
            $scope.projectPrincipal = p.get('debitPricipalInterest');
            $scope.projectComeFrom = p.get('comefrom');
            $scope.projectProvince = p.get('province');
            $scope.projectAddress = p.get('plainAddress');
            $scope.projectCredits = p.get('creditHighlights');
            $scope.projectManagerId = p.get('projectManager').id;
            $scope.projectManagerName = p.get('projectManager').get('name');
            $scope.projectManagerPhone = p.get('projectManager').get('phone');

            $scope.projectHot = p.get('isHot');
            $scope.projectHouse = p.get('isHouse');
            $scope.projectRecommended = p.get('isRecommended');
            $scope.projectFactory = p.get('isFactory');
            $scope.projectDebt = p.get('isDebt');
            $scope.projectShop = p.get('isShop');
            
            var query1 = new AV.Query("Sponsorship")
            query1.equalTo('project', p)
            query1.find().then(function (sponsors) {
                $scope.sponsorsList = sponsors;
                $scope.$apply();
            })

            var query2 = new AV.Query("Asset")
            query2.equalTo('project', p)
            query2.find().then(function (assets) {
                $scope.assetsList = assets;
                $scope.$apply();
            })

            var query3 = new AV.Query("Borrower")
            query3.equalTo('project', p)
            query3.find().then(function (borrowers) {
                for (var i = 0; i < borrowers.length; i++) {
                    borrowers[i].set('totalInterest', parseFloat(borrowers[i].get('principalDebit')) + parseFloat(borrowers[i].get('interestCreditor')));
                }
                $scope.borrowerList = borrowers;
                $scope.$apply();
            })

            var query4 = new AV.Query("ProjectMedia")
            query4.equalTo('project', p)
            query4.find().then(function (images) {
              console.log(images.length);

                for (var i = 0; i < images.length; i++) {
                    images[i].set('imageUrl', images[i].get('image').thumbnailURL(200, 150));
                    images[i].set('url', images[i].get('image').thumbnailURL(1280, 720));
                }

                $scope.imageList = images;
                $scope.$apply();
            })

            var query5 = new AV.Query("ProjectVisit")
            query5.equalTo('project', p)
            query5.count().then(function (count) {                
                $scope.countVisit = count;
                $scope.$apply();
            })

            var query6 = new AV.Query("ShopCar")
            query6.equalTo('project', p)
            query6.count().then(function (count) {                
                $scope.countShopCar = count;
                $scope.$apply();
            })

            var query7 = new AV.Query("Offert")
            query7.equalTo('project', p)
            query7.count().then(function (count) {                
                $scope.countOffers = count;
                $scope.$apply();
            })

            $scope.$apply();
        })
    };

    $scope.init();

  }]);