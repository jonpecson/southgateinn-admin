'use strict';

/**
 * @ngdoc overview
 * @name adminHotelReservationApp
 * @description
 * # adminHotelReservationApp
 *
 * Main module of the application.
 */
angular
    .module('adminHotelReservationApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'ui.calendar'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

.directive('myModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss = function() {
                element.modal('hide');
            };
        }
    }
})

.constant('Enum', {
    SomeEnums: [{
        id: 1,
        enumName: 'Something',
        name: 'Something'
    }, {
        id: 2,
        enumName: 'AnotherThing',
        name: 'Another Thing'
    }, {
        id: 3,
        enumName: 'AndAnotherThing',
        name: 'And Another Thing'
    }]
});
