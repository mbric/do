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
  //$scope.tree = [{name: "Node", nodes: [{name: "Node-X1", nodes: []}, {name: "Node-X2", nodes: []}]}, {name: "Node-X", nodes: [{name: "Node-X1", nodes: []}, {name: "Node-X2", nodes: []}]}];
  $scope.delete = function(data) {
      angular.forEach(data.nodes, function(node){
        node.name = ''
      })
      console.log($scope.tree)
  };
  $scope.addDefault = function(data) {
      $scope.tree.push({name: "Node", nodes: []})
  };
  $scope.add = function(data) {
      var post = data.nodes.length + 1;
      var newName = data.name + '-' + post;
      data.nodes.push({name: newName,nodes: []});
  };
  $scope.applyScope = function() {
    $scope.$apply();
    $scope.$digest();
  };
}
