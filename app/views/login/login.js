'use strict';

angular.module('myApp.Login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login/:uriOption', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams) {

        $('html,body').scrollTop(0);

        $rootScope.showBanner = false;

        $scope.phoneNumber = '';
        $scope.smsCode = '';

        $scope.option = $routeParams.uriOption;

        $scope.goToProject = function (id) {
            $rootScope.customGoTo('project-details/' + id);
        };

        $scope.loginWithSmsCode = function () {
            console.log('loginWithSmsCode:' + ' ' + $scope.phoneNumber + ' ' + $scope.smsCode);

            AV.User.signUpOrlogInWithMobilePhone($scope.phoneNumber, $scope.smsCode).then(res => {
                console.log(res);
                console.log($scope.option);
                $rootScope.initWishList();
                $rootScope.customGoTo($scope.option);
            }).catch(function (error) {
                console.log(error);
            });
        };

        $scope.requestSmsCode = function () {
            console.log('requestSmsCode ' + $scope.phoneNumber);

            AV.Cloud.requestSmsCode($scope.phoneNumber).then(res => {
                console.log(res);
                $rootScope.displayAlert('success', 'SMS Message sended OK');

            }).catch(function (error) {
                console.log(error);
                $rootScope.displayAlert('danger', error);
            });
        };

    }]);