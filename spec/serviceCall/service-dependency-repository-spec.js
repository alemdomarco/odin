(function () {

    "use strict"

    const ServiceDependencyRepository = require("./../../serviceCall/service-dependency-repository");

    var serviceDependencyRepository = new ServiceDependencyRepository();

    describe("Service Dependency Repository Test", function () {
        it("Testing data to graph", function () {
            
            var data = {
                columns: ['s1.host', 's2.host', 'avg(toFloat(c.latency))', 'count(c)'],
                data:
                [['service1', 'service4', 1, 3]]
            }
            
            var graph = serviceDependencyRepository.dataToGraph(data.data);
            
            expect(graph.nodes.length).toBe(2);
            expect(graph.edges.length).toBe(1);
            expect(graph.nodes[0].id).toBe("service1");
            expect(graph.nodes[0].label).toBe("service1");
            expect(graph.nodes[1].id).toBe("service4");
            expect(graph.nodes[1].label).toBe("service4");
            expect(graph.edges[0].source).toBe("service1");
            expect(graph.edges[0].target).toBe("service4");
            
        });
    });


})();