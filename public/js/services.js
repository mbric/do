'use strict';

/* Services */

//ngSanitize
angular.module('myApp.services', []).factory('sharedModel', function($rootScope) {
      var model = {name:{first:'', last:''}};
      var lastModel = angular.copy(model);

      //var socket = io.connect('http://localhost:8889/');
      var socket = io.connect();

      socket.on('channel', function(message){
        set(model, message.path, message.value);
        set(lastModel, message.path, message.value);
        $rootScope.sharedModel = model;
        $rootScope.$apply();
      });

      $rootScope.$watch('sharedModel', function() {
        syncObject('', model, lastModel);
      }, true);

      return model;

      function syncObject(parent, src, dst) {
        for(var name in src) {
          var path = (parent ? parent + '.' : '') + name;
          if (src[name] === dst[name]) {
            // do nothing we are in sync
          } else if (typeof src[name] == 'object') {
            // we are an object, so we need to recurse
            syncObject(path, src[name], dst[name] || {});
          } else {
            socket.emit("channel", {path:path, value:src[name]});
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
    });


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
//  value('version', '0.1').
//  factory('socket', function ($rootScope) {
//    var socket = io.connect();
//    return {
//      on: function (eventName, callback) {
//        socket.on(eventName, function () {  
//          var args = arguments;
//          $rootScope.$apply(function () {
//            callback.apply(socket, args);
//          });
//        });
//      },
//      emit: function (eventName, data, callback) {
//        socket.emit(eventName, data, function () {
//          var args = arguments;
//          $rootScope.$apply(function () {
//            if (callback) {
//              callback.apply(socket, args);
//            }
//          });
//        })
//      }
//    };
//  });
