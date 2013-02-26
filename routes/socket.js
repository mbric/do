/*
 * Serve content over a socket
 */

var model = {};
var clients = [];

module.exports = function (socket) {
  //socket.emit('send:name', {
  //  name: 'Bob'
  //});

  //setInterval(function () {
  //  socket.emit('send:time', {
  //    time: (new Date()).toString()
  //  });
  //}, 1000);
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
