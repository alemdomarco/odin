(function () {

  "use strict"

  const OdinFileProducer = require("./producer/odin-file-producer");
  const Server = require('./server.js');

  if (process.argv.length > 2) {
    var nginx = process.argv[2];
    if (nginx.indexOf("nginx") > -1) {
      let odinFileProducer = new OdinFileProducer();
      odinFileProducer.produceOdinDate();
    };
  }
  
  let server = new Server();
  server.startServer();

})();