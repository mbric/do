/*
 * Serve content over a socket
 */

var model = {};
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

  // new client is here! 
  socket.on('channel', function(msg){
    console.log('message:');
    console.log(msg);
    set(model, msg.path, msg.value);
    clients.forEach(function(otherClient){
      if (socket !== otherClient){
        console.log("emitting..");
        otherClient.emit("channel", msg);
      }
    });
    console.log(msg);
  });
  socket.emit("channel", {path:'', value:model});
};
