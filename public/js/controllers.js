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

function DiscussionCtrl($scope, sharedCommentModel) {
  $scope.comments = sharedCommentModel 
  $scope.addComment = function() {
    $scope.comments.push({text:$scope.commentText, done:false});
    $scope.commentText = '';
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
