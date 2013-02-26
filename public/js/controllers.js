'use strict';

/* Controllers */

function AppCtrl($scope, socket) {
  socket.on('send:name', function (data) {
    $scope.name = data.name;
  });
}

function DiscussionCtrl($scope, socket) {
  $scope.comments = [{text:"task1"}, {text:"task2"}]
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
