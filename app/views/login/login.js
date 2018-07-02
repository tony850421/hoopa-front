'use strict';

angular.module('myApp.Login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login/:uriOption', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login/:uriOption/:id', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', '$translate', function ($rootScope, $scope, $routeParams, $translate) {

        $('html,body').scrollTop(0);

        $rootScope.showBanner = false;

        $scope.phoneNumber = '';
        $scope.smsCode = '';

        $scope.option = $routeParams.uriOption;
        $scope.id = $routeParams.id || '';

        $scope.goToProject = function (id) {
            $rootScope.customGoTo('project-details/' + id);
        };

        $scope.loginWithSmsCode = function () {
            AV.User.signUpOrlogInWithMobilePhone($scope.phoneNumber, $scope.smsCode).then(res => {
                $rootScope.getUser();
                $rootScope.initWishList();
                $rootScope.initOffersList();
                if($scope.id != ''){
                    $rootScope.customGoTo($scope.option+"/"+ $scope.id);
                } else {
                    $rootScope.customGoTo($scope.option);
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        $scope.requestSmsCode = function () {
            AV.Cloud.requestSmsCode($scope.phoneNumber).then(res => {
                var sms = $translate.instant('SMSSENDED');
                $rootScope.displayAlert('success', sms);
            }).catch(function (error) {
                $rootScope.displayAlert('danger', error);
            });
        };
    }]);