(function(){
  
  "use strict"
  const Hapi = require('hapi');
  
  class ServiceCallRoute {
    
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