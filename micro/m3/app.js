(function(){
  "use strict"
  
  const Hapi = require('hapi');
  const http = require('http');
  const requestApi = require('request');
  
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: 9030
  });

  // Add the route
  server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
     return reply('hello m3');
    }
  });

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
})();