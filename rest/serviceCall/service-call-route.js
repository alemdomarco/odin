(function(){
  
  "use strict"
  const Hapi = require('hapi');
  
  class ServiceCallRoute {
    
    loadRoutes(server){
      
        server.route({
            method: 'POST',
            path: '/service/call',
            handler: function (request, reply) {
                var rawServiceCall = request.payload;
                console.log(rawServiceCall);
                reply('Service call saved');
            }
        });
    }
    
  };
  
  module.exports = ServiceCallRoute;
  
})();