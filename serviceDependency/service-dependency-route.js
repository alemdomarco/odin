(function () {

    "use strict"
    const Hapi = require('hapi');
    const ServiceDependencyService = require("./service-dependency-service");

    class ServiceDependencyRoute {

        loadRoutes(server) {

            let serviceDependencyService = new ServiceDependencyService();

            server.route({
                method: 'GET',
                path: '/service/dependency/graph',
                handler: function (request, reply) {
                    serviceDependencyService.findAggregatedAll().then(function (response) {
                        console.log(response);
                        reply(response);
                    });
                }
            });
            
            server.route({
                method: 'GET',
                path: '/service/{host}/dependency/graph',
                handler: function (request, reply) {
                    let host = request.params.host;
                    serviceDependencyService.findAggregatedDependenciesOfHost(host).then(function (response) {
                        reply(response);
                    });
                }
            });
            
            server.route({
                method: 'GET',
                path: '/service/{host}/dependency',
                handler: function (request, reply) {
                    let host = request.params.host;
                    serviceDependencyService.findAllDependencyCallsOfHost(host).then(function (response) {
                        reply(response);
                    });
                }
            });
        }

    };

    module.exports = ServiceDependencyRoute;

})();