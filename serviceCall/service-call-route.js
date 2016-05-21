(function(){
  
  "use strict"
  const Hapi = require('hapi');
  const ServiceCallRepository = require("./service-call-repository");
  
  class ServiceCallRoute {
    
    constructor(){
        this._serviceCallRepository = new ServiceCallRepository();
    }
    
    loadRoutes(server){
      
        server.route({
            method: 'GET',
            path: '/service/call',
            handler: function (request, reply) {
                reply('Service call get');
            }
        });
    }
    
  };
  
  module.exports = ServiceCallRoute;
  
})();