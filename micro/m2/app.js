(function(){
  "use strict"
  
  const Hapi = require('hapi');
  const http = require('http');
  const requestApi = require('request');
  
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: 9020
  });

  // Add the route
  server.route({
    method: 'GET',
    path:'m2/',
    handler: function (request, reply) {
     return reply('hello m2');
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