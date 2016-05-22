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
                    serviceDependencyRepository.findAggAll().then(function (data) {
                        reply(serviceDependencyRepository.dataToGraph(data));
                    });
                }
            });
            
            server.route({
                method: 'GET',
                path: '/service/{host}/dependency/graph',
                handler: function (request, reply) {
                    let host = request.params.host;
                    serviceDependencyRepository.findAggDependenciesOfHost(host).then(function (data) {
                        reply(serviceDependencyRepository.dataToGraph(data));
                    });
                }
            });
            
            server.route({
                method: 'GET',
                path: '/service/{host}/dependency',
                handler: function (request, reply) {
                    let host = request.params.host;
                    serviceDependencyRepository.findDependenciesOfHost(host).then(function (data) {
                        reply(data);
                    });
                }
            });
        }

    };

    module.exports = ServiceDependencyRoute;

})();