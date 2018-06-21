'use strict';

angular.module('myApp.Translate',[]).config(['$translateProvider', function ($translateProvider) {
    // Adding a translation table for the English language
    $translateProvider.translations('en_US', {
        "SIGNUP": "Sign Up"
    });
    // Adding a translation table for the Chinese language
    $translateProvider.translations('ch_CH', {
        "SIGNUP": "注册"
    });
    $translateProvider.preferredLanguage('en_US ');
}]);
