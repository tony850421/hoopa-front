'use strict';

angular.module('myApp.ProjectDetails', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project-details/:id', {
            templateUrl: 'views/project-details/project-details.html',
            controller: 'ProjectDetailsCtrl'
        });
    }])

    .controller('ProjectDetailsCtrl', ['$rootScope', '$scope', '$routeParams', '$translate', function ($rootScope, $scope, $routeParams, $translate) {

        $('html,body').scrollTop(0);

        $rootScope.showBanner = false;

        $scope.tabAssetsVisible = true;
        $scope.tabBorrowersVisible = false;
        $scope.tabSponsorsVisible = false;
        $scope.tabCommentsVisible = false;

        $scope.titleReview = '';
        $scope.ratingReview = '';
        $scope.contentReview = '';
        $scope.reviews = [];

        $scope.totalOffers = 0;
        $scope.promOffers = 0;
        $scope.offerValue = 0;

        $scope.projectId = $routeParams.id;

        $scope.project = {};
        $scope.sponsorsList = [];
        $scope.assetsList = [];
        $scope.borrowerList = [];
        $scope.imageList = [];
        $scope.projects = [];
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
                $scope.project.wished = false;

                $scope.fectComments();

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

                var query8 = new AV.Query("ShopCar")
                query8.equalTo('project', p);
                query8.equalTo('user', AV.User.current());
                query8.count().then(res => {
                    if (res > 0) {
                        $scope.project.wished = true;
                    }
                    $scope.$apply();
                });

                var query9 = new AV.Query('Offert');
                query9.equalTo('project', p);
                query9.find().then(function (offers) {
                    $scope.totalOffers = offers.length;
                    var sum = 0;
                    for (var i = 0; i < $scope.totalOffers; i++) {
                        sum += parseFloat(offers[i].get('amount'));
                    }
                    $scope.promOffers = parseFloat(sum / $scope.totalOffers);
                    $scope.promOffers = Math.round($scope.promOffers*Math.pow(10,2))/Math.pow(10,2);
                    $scope.$apply();
                })

                $scope.$apply();
            })

            var queryProjects = new AV.Query('Project');
            queryProjects.limit(5);
            queryProjects.equalTo('isRecommended', true);
            queryProjects.find().then(function (res) {
                $scope.projects = [];

                res.forEach(function (element) {
                    var mainImage = element.get('image').thumbnailURL(260, 160);
                    var title = element.get('title');
                    // var content = element.get('content');
                    var id = element.id;
                    var amount = element.get('debitAmount');

                    $scope.projects.push({
                        id: id,
                        mainImage: mainImage,
                        title: title,
                        amount: amount
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

        $scope.goToProject = function (id) {
            $rootScope.customGoTo('project-details/' + id);
        };

        $scope.publishReview = function () {
            var user = AV.User.current();
            if (user && $scope.ratingReview != '' && $scope.contentReview != '') {
                var query = new AV.Object('ForumComment');
                query.set('content', $scope.contentReview);
                query.set('user', user);
                query.set('rating', $scope.ratingReview);
                query.set('avatarUrl', user.get('avatarUrl'));
                var project = AV.Object.createWithoutData('Project', $scope.project.id);
                query.set('project', project);

                var acl = new AV.ACL();
                acl.setPublicReadAccess(true);
                acl.setPublicWriteAccess(true);
                query.setACL(acl);

                query.save().then(function (comment) {
                    comment.createdAt = comment.createdAt.toLocaleDateString('zh-CN') + " " + comment.createdAt.toLocaleTimeString('zh-CN');

                    var rating = parseInt(comment.get('rating'));
                    comment.rating = [5];
                    for (var t = 0; t < rating; t++) {
                        comment.rating[t] = {
                            id: t,
                            class: 'text-default'
                        };
                    }
                    for (var x = rating; x < 5; x++) {
                        comment.rating[x] = {
                            id: t,
                            class: ''
                        };
                    }

                    $scope.reviews.push(comment);

                    $scope.ratingReview = '';
                    $scope.contentReview = '';

                    $scope.$apply();
                }).catch(function (error) {
                    console.log(error);
                });
            }
        };

        $scope.fectComments = function () {
            var user = AV.User.current();
            if (user) {
                var query1 = new AV.Query('ForumComment');
                query1.equalTo('project', $scope.project)
                query1.find().then(function (comments) {
                    $scope.reviews = [];

                    for (var i = 0; i < comments.length; i++) {
                        comments[i].createdAt = comments[i].createdAt.toLocaleDateString('zh-CN') + " " + comments[i].createdAt.toLocaleTimeString('zh-CN');
                        var rating = parseInt(comments[i].get('rating'));
                        comments[i].rating = [5];
                        for (var t = 0; t < rating; t++) {
                            comments[i].rating[t] = {
                                id: t,
                                class: 'text-default'
                            };
                        }
                        for (var x = rating; x < 5; x++) {
                            comments[i].rating[x] = {
                                id: t,
                                class: ''
                            };
                        }
                    }

                    console.log(comments);
                    $scope.reviews = comments;
                })
            }
        };

        $scope.addToWhishList = function () {
            var currentUser = AV.User.current();

            if (currentUser) {
                var project = AV.Object.createWithoutData('Project', $scope.project.id);

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
                            var addedWishList = $translate.instant('ADDEDWISHLIST');
                            $rootScope.displayAlert('success', addedWishList);
                            $scope.project.wished = true;
                            $scope.$apply();
                        });
                    }
                });

            } else {
                $rootScope.customGoTo('login/projects');
            }
        };

        $scope.removeToWhishList = function () {
            var currentUser = AV.User.current();

            if (currentUser) {
                var project = AV.Object.createWithoutData('Project', $scope.project.id);

                var query = new AV.Query("ShopCar")
                query.equalTo('project', project);
                query.equalTo('user', currentUser);
                query.find().then(res => {
                    res.forEach(function (element) {
                        element.destroy();
                        var removeWishList = $translate.instant('REMOVEDWISHLIST');
                        $rootScope.displayAlert('success', removeWishList);
                        $scope.project.wished = false;
                        $scope.$apply();
                    });
                })
            }
        };

        $scope.flagBid = false;
        $scope.bid = '';

        $scope.makeAnOffer = function () {
            var user = AV.User.current();
            if (user) {
                $scope.flagBid = !$scope.flagBid;
            } else {
                $rootScope.customGoTo('login/project-details/' + $scope.project.id);
            }
        };

        $scope.makeABid = function () {
            var user = AV.User.current();
            if (user) {
                var project = AV.Object.createWithoutData('Project', $scope.project.id);
                var offer = new AV.Object('Offert');
                offer.set('user', user);
                offer.set('project', project);
                offer.set('amount', $scope.offerValue);
                offer.set('pending', true);

                var acl = new AV.ACL();
                acl.setPublicReadAccess(true);
                acl.setPublicWriteAccess(true);
                offer.setACL(acl);
                offer.save();

                $scope.offerValue = 0;
                $scope.flagBid = !$scope.flagBid;
                var offerMade = $translate.instant('OFFERMADE');
                $rootScope.displayAlert('success', offerMade);

                var query9 = new AV.Query('Offert');
                query9.equalTo('project', project);
                query9.find().then(function (offers) {
                    $scope.totalOffers = offers.length;
                    var sum = 0;
                    for (var i = 0; i < $scope.totalOffers; i++) {
                        sum += parseFloat(offers[i].get('amount'));
                    }
                    $scope.promOffers = parseFloat(sum / $scope.totalOffers);
                    $scope.promOffers = Math.round($scope.promOffers*Math.pow(10,2))/Math.pow(10,2);
                    $scope.$apply();
                })
            } else {
                $rootScope.customGoTo('login/project-details/' + $scope.project.id);
            }
        };

    }]);