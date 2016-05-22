(function () {

  'use strict';

  const Hapi = require('hapi');
  const Inert = require('inert');
  const ServiceDependencyRoute = require('./serviceDependency/service-dependency-route');

  class Server {

    startServer() {
      const server = new Hapi.Server();
      server.connection({ routes: { cors: true }, host: process.env.IP || '0.0.0.0', port: parseInt(process.env.PORT) || 5000 });

      var serviceDependencyRoute = new ServiceDependencyRoute();
      serviceDependencyRoute.loadRoutes(server);

      server.register(Inert, () => { });

      server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
            path: 'ui',
            redirectToSlash: true,
            index: true
          }
        }
      });


      server.start(() => {
        console.log('Server running at:', server.info.uri);
      });
    }
  }
  module.exports = Server;
})();