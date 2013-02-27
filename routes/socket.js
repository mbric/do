/*
 * Serve content over a socket
 */

var commentModel = {};
var taskModel = {};
var clients = [];

module.exports = function (socket) {
  
  function set(obj, path, value){
    var lastObj = obj;
    var property;
    path.split('.').forEach(function(name){
      if (name) {
        lastObj = obj;
        obj = obj[property=name];
        if (!obj) {
          lastObj[property] = obj = {};
        }
      }
    });
    lastObj[property] = value;
  }

  clients.push(socket);

  //listen to comments channel
  socket.on('comments', function(msg){
    console.log('message:');
    console.log(msg)
    set(commentModel, msg.path, msg.value);
    clients.forEach(function(otherClient){
      if (socket !== otherClient){
        console.log("emitting..");
        otherClient.emit("comments", msg);
      }
    });
    console.log(msg);
  //listen to tasks channel
  }).on('tasks', function(msg){
    console.log('message:');
    console.log(msg)
    set(taskModel, msg.path, msg.value);
    clients.forEach(function(otherClient){
      if (socket !== otherClient){
        console.log("emitting..");
        otherClient.emit("tasks", msg);
      }
    });
    console.log(msg);
  });

  // initialize channels
  socket.emit("comments", {path:'', value:commentModel});
  socket.emit("tasks", {path:'', value:taskModel});

  //TODO 
  // try taking advantage of paths
  // socket.emit("channel", {path:'/tasks', value:taskModel});
};
