(function () {

  const zmq = require('zmq')
  const sock = zmq.socket('pull');

  sock.connect('tcp://127.0.0.1:9998');
  sock.on('message', function (msg) {
    console.log('Saving on neo4j :)');
  });

})();