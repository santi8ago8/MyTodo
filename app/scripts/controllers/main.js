'use strict';

/**
 * @ngdoc function
 * @name mitodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mitodoApp
 */
angular.module('mitodoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.search = '';

    $scope.todos = [
      {text:"comprar zapatillas"},
      {text:"comprar libreta"},
      {text:"comprar comida"},
      {text:"aaaa primera"},
      {text:"comer comida"},
      {text:"sacar el perro"}
    ];

    $scope.addTodo = function(){
      if ($scope.todo){
        $scope.todos.push({text:$scope.todo});
        $scope.todo = '';
      }
    };

    $scope.removeTodo=function(index){
      $scope.todos.splice(index,1);
    };
  });
