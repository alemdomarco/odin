(function () {

    "use strict"
    const Hapi = require('hapi');
    const ServiceDependencyRepository = require("./service-dependency-repository");

    class ServiceDependencyRoute {

        loadRoutes(server) {

            let serviceDependencyRepository = new ServiceDependencyRepository()

            server.route({
                method: 'GET',
                path: '/service/dependency/graph',
                handler: function (request, reply) {
                    serviceDependencyRepository.findAggAll().then(function (response) {
                        reply(serviceDependencyRepository.dataToGraph(response.data));
                    });
                }
            });
            
            server.route({
                method: 'GET',
                path: '/service/{host}/dependency/graph',
                handler: function (request, reply) {
                    let host = request.params.host;
                    serviceDependencyRepository.findAggDependenciesOfHost(host).then(function (response) {
                        reply(response);
                    });
                }
            });
            
            server.route({
                method: 'GET',
                path: '/service/{host}/dependency',
                handler: function (request, reply) {
                    let host = request.params.host;
                    serviceDependencyRepository.findDependenciesOfHost(host).then(function (response) {
                        reply(response.data);
                    });
                }
            });
        }

    };

    module.exports = ServiceDependencyRoute;

})();