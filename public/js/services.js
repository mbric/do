'use strict';

/* Services */
angular.module('myApp.services', [])
  .factory('sharedCommentModel', function($rootScope) {
  var model = [];
  //var model = [{name: "Node", nodes: [{name: "Node-X1", nodes: []}, {name: "Node-X2", nodes: []}]}, {name: "Node-X", nodes: [{name: "Node-X1", nodes: []}, {name: "Node-X2", nodes: []}]}];
  var lastModel = angular.copy(model);

  var socket = io.connect();

  socket.on('comments', function(message){
    set(model, message.path, message.value);
    set(lastModel, message.path, message.value);
    $rootScope.sharedCommentModel = model;
    $rootScope.$apply();
  });

  $rootScope.$watch('sharedCommentModel', function() {
    syncObject('', model, lastModel, socket, "comments");
  }, true);

  return model;
}).factory('sharedTaskModel', function($rootScope) {
  var model = [];
  var lastModel = angular.copy(model);

  var socket = io.connect();

  socket.on('tasks', function(message){
    set(model, message.path, message.value);
    set(lastModel, message.path, message.value);
    $rootScope.sharedTaskModel = model;
    $rootScope.$apply();
  });

  $rootScope.$watch('sharedTaskModel', function() {
    syncObject('', model, lastModel, socket, "tasks");
  }, true);

  return model;
});

function syncObject(parent, src, dst, socket, channel) {
  for(var name in src) {
    var path = (parent ? parent + '.' : '') + name;
    if (src[name] === dst[name]) {
      // do nothing we are in sync
    } else if (typeof src[name] == 'object') {
      // we are an object, so we need to recurse
      syncObject(path, src[name], dst[name] || {}, socket, channel);
    } else {
      socket.emit(channel, {path:path, value:src[name]});
      dst[name] = angular.copy(src[name]);
    }
  }
}

function set(obj, path, value) {
  if (!path) return angular.copy(value, obj);
  var lastObj = obj;
  var property;
  angular.forEach(path.split('.'), function(name){
    if (name) {
      lastObj = obj;
      obj = obj[property=name];
      if (!obj) {
        lastObj[property] = obj = {};
      }
    }
  });
  lastObj[property] = angular.copy(value);
}
