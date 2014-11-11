'use strict';

/**
 * @ngdoc function
 * @name mitodoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mitodoApp
 */
angular.module('mitodoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
