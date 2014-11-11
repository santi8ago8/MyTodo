'use strict';

/**
 * @ngdoc function
 * @name mitodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mitodoApp
 */
angular.module('mitodoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.search = '';

    $http.get('/api/list')
      .success(function (data, status, header, config) {
        $scope.todos = data.data;
        console.log(data);
      });

    $scope.addTodo = function () {
      if ($scope.todo) {

        $http.post('/api/add', {
          todo: $scope.todo
        })
          .success(function (data, status, header, config) {
            console.log(data);
            $scope.todos.push($scope.todo);
            $scope.todo = '';
          });
      }
    };

    $scope.removeTodo = function (index) {
      $http.post('/api/remove', {
        todo: $scope.todos[index]
      })
        .success(function (data, status, header, config) {
          console.log(data);
          $scope.todos.splice(index, 1);
        });

    };
  });