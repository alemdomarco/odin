(function () {
  "use strict"

  const zmq = require('zmq');
  const sock = zmq.socket('push');
  const io = require('socket.io').listen(5000);
  
  sock.bindSync('tcp://127.0.0.1:9998');
  
  io.on('connection', function(socket){
    socket.on('event', function(data){
      sock.send('some work');
    });
    socket.on('disconnect', function(){
    });
  });
})();