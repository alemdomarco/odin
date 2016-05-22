(function(){
  
  "use strict"
  
  const OdinFileProducer = require("./producer/odin-file-producer");
  const Server = require('./server.js');
  
  //let odinFileProducer = new OdinFileProducer();
  // Temp disabled
  //odinFileProducer.produceOdinDate();
  
  let server = new Server();
	server.startServer();
  
})();