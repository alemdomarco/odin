(function () {
  "use strict"

  const Tail = require('tail').Tail;
  const odinLog = "/usr/share/nginx/logs/access-odin.log";
  const ServiceCallRepository = require("./../serviceCall/service-call-repository")

  class OdinFileProducer {

    constructor() {
      this._tail = new Tail(odinLog);
    }

    produceOdinDate() {
      
      let serviceCallRepository = new ServiceCallRepository();
      
      this._tail.on("line", function (data) {
        let parsedDate = JSON.parse(data);
        let parameters = parsedDate.request_uri.split('/');
        let odin = {
          time: parsedDate.time,
          latency: parsedDate.request_time,
          origin: parsedDate.origin,
          destination: parsedDate.destination,
          port: parsedDate.port,
          context: parameters[1],
          uri: parsedDate.request_uri,
          status: parsedDate.status_code,
          method: parsedDate.method
        }
        
        serviceCallRepository.saveServiceCallData(odin);
      });

      this._tail.on("error", function (error) {
        console.log('ERROR: ', error);
      });
    }
  }
  
  module.exports = OdinFileProducer;
})();