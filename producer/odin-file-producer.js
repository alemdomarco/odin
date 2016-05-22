(function () {
  "use strict"

  const Tail = require('tail').Tail;
  const properties = require('./../config/config.js');
  const ServiceDependencyRepository = require("./../serviceDependency/service-dependency-repository")

  class OdinFileProducer {

    constructor() {
      this._tail = new Tail(properties.get('main.odinLog'));
    }

    produceOdinDate() {
      
      let serviceDependencyRepository = new ServiceDependencyRepository();
      
      this._tail.on("line", function (data) {
        let parsedDate = JSON.parse(data);
        let odin = {
          time: parsedDate.time,
          latency: parsedDate.request_time,
          origin: parsedDate.origin,
          destination: parsedDate.destination.split(':')[0],
          port: parsedDate.port,
          context: parsedDate.request_uri.split('/')[1],
          uri: parsedDate.request_uri,
          status: parsedDate.status_code,
          method: parsedDate.method
        }
        
        console.log(odin);
        serviceDependencyRepository.saveServiceCallData(odin);
      });

      this._tail.on("error", function (error) {
        console.log('ERROR: ', error);
      });
    }
  }
  
  module.exports = OdinFileProducer;
})();