'use strict';

/* Controllers */

function AppCtrl($scope, socket) {
  socket.on('send:name', function (data) {
    $scope.name = data.name;
  });
}

function TaskCtrl($scope, sharedTaskModel) {
  $scope.tasks = sharedTaskModel 
  $scope.addTask = function() {
    $scope.tasks.push({text:$scope.taskText, done:false});
    $scope.taskText = '';
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

function MyCtrl1($scope, socket) {
  socket.on('send:time', function (data) {
    $scope.time = data.time;
  });
}
MyCtrl1.$inject = ['$scope', 'socket'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
