'use strict';

angular.module('myApp.Main', ['ngRoute'])

    .controller('MainCtrl', ['$rootScope', '$scope', '$window', '$translate', function ($rootScope, $scope, $window, $translate) {

        // $scope.baseUrl = 'https://hoopa.org/front-end/#!/';
        // $scope.baseUrl = 'http://127.0.0.1:8000/#!/';
        $scope.baseUrl = 'http://localhost/hoopa-front/app/#!/';

        $scope.languageShort = "English";

        $rootScope.customGoTo = function (route) {
            $window.location.href = $scope.baseUrl + route;
        };

        $rootScope.displayAlert = function (type, message) {
            //type => 'success', 'info', 'warning', 'danger'
            $.notify({
                message: message
            }, {
                    type: type,
                    delay: 4000,
                    offset: {
                        y: 100,
                        x: 20
                    }
                });
        }

        $scope.setLanguage = function (lan) {
            switch (lan) {
                case 'cn_CN':
                    $scope.languageShort = "中文";
                    break;
                case 'en_EN':
                    $scope.languageShort = "English";
                    break;
                case 'es_ES':
                    $scope.languageShort = "Español";
                    break;
                default:
                    break;
            }
            $translate.use(lan);
        };

        // $scope.setLanguage('en_EN');

    }]);