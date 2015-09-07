/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ngResource',
                         'ngRoute',
                         'myApp.services',
                         'myApp.controllers'])

  .constant('HOST', 'http://localhost:1337') //DEV
  // .constant('HOST', 'http://yourdomain.herokuapp.com') //PRODUCTION

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/users-index'
      , controller: 'UsersIndexCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login'
      , controller: 'LoginCtrl'
      })
      .when('/sign-up', {
        templateUrl: 'templates/sign-up'
      , controller: 'SignUpCtrl'
      })
      .when('/profile', {
        templateUrl: 'templates/profile'
      , controller: 'MainCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);
