(function () {
  "use strict"

  const Hapi = require('hapi');
  const http = require('http');
  const requestApi = require('request');

  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: 9010
  });

  // Add the route
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply('hello m1');
    }
  });

  server.route({
    method: 'GET',
    path: '/m2',
    handler: function (request, reply) {

      requestApi('http://localhost:9292/m2/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          return reply(body);
        }
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/m3',
    handler: function (request, reply) {

      requestApi('http://localhost:9292/m3/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          return reply(body);
        }
      });
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