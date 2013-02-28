'use strict';

/* Controllers */

function TaskController($scope, sharedTaskModel) {
  $scope.tasks = sharedTaskModel 
  $scope.addTask = function() {
    $scope.tasks.push({text:$scope.taskText, done:false});
    $scope.taskText = '';
  };
  $scope.deleteTask = function(task) {
    var i = $scope.tasks.indexOf(task);
    if(i != -1) {
      $scope.tasks.splice(i, 1);
    }
  };
}

function TreeController($scope, sharedCommentModel) {
  $scope.tree = sharedCommentModel
  $scope.delete = function(data) {
      data.nodes = [];
  };
  $scope.addDefault = function(data) {
      $scope.tree.push({name: "Node", nodes: []})
  };
  $scope.add = function(data) {
      var post = data.nodes.length + 1;
      var newName = data.name + '-' + post;
      data.nodes.push({name: newName,nodes: []});
  };
}
