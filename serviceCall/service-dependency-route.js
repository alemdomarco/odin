(function(){
  
  "use strict"
  const Hapi = require('hapi');
  const ServiceDependencyRepository = require("./service-dependency-repository");
  
  class ServiceDependencyRoute {
    
    constructor(){
        this._serviceDependencyRepository = new ServiceDependencyRepository();
    }
    
    loadRoutes(server){
      
        server.route({
            method: 'GET',
            path: '/service/dependency/graph/',
            handler: function (request, reply) {
                
            }
        });
        
        server.route({
            method: 'GET',
            path: '/service/call',
            handler: function (request, reply) {
                reply('Service call get');
            }
        });        
    }
    
  };
  
  module.exports = ServiceDependencyRoute;
  
})();