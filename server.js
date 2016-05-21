(function () {

  'use strict';

  const hapi = require('hapi');
  const ServiceCallRoute = require('./rest/serviceCall/service-call-route');

  class Server {

    startServer() {
      const server = new hapi.Server();
      server.connection({ routes: { cors: true }, port: process.env.PORT || 5000 });

      var serviceCallRoute = new ServiceCallRoute();
      serviceCallRoute.loadRoutes(server);

      server.start(() => {
        console.log('Server running at:', server.info.uri);
      });
    }
  }
  module.exports = Server;
})();