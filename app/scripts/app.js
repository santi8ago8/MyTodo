//'use strict';

/**
 * @ngdoc overview
 * @name mitodoApp
 * @description
 * # mitodoApp
 *
 * Main module of the application.
 */
var app = angular
  .module('mitodoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      return response || $q.when(response);
    },
    responseError: function (response) {
      console.log(response);
      if (response.status === 401) {
        $location.path('/login');

      }

      return $q.reject(response);

    }
  };
});