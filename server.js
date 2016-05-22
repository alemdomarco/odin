(function () {

  'use strict';

  const hapi = require('hapi');
  const ServiceDependencyRoute = require('./serviceCall/service-dependency-route');

  class Server {

    startServer() {
      const server = new hapi.Server();
      server.connection({ routes: { cors: true }, port: process.env.PORT || 5000 });

      var serviceDependencyRoute = new ServiceDependencyRoute();
      serviceDependencyRoute.loadRoutes(server);

      server.start(() => {
        console.log('Server running at:', server.info.uri);
      });
    }
  }
  module.exports = Server;
})();