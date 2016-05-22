(function () {

    "use strict"

    const ServiceDependencyService = require("./../../serviceDependency/service-dependency-Service");

    var serviceDependencyService = new ServiceDependencyService();

    describe("Service Dependency Service Test", function () {
        it("Testing data to graph", function () {
            
            var data = {
                columns: ['s1.host', 's2.host', 'avg(toFloat(c.latency))', 'count(c)'],
                data:
                [['service1', 'service4', 1, 3]]
            }
            
            var graph = serviceDependencyService.dataToGraph(data.data);
            
            expect(graph.nodes.length).toBe(2);
            expect(graph.edges.length).toBe(1);
            expect(graph.nodes[0].id).toBe("service1");
            expect(graph.nodes[0].label).toBe("service1");
            expect(graph.nodes[1].id).toBe("service4");
            expect(graph.nodes[1].label).toBe("service4");
            expect(graph.edges[0].source).toBe("service1");
            expect(graph.edges[0].target).toBe("service4");
            
        });
        
        it("Testing data to front", function () {
            
            var data = {
                columns: ['host1', 'host2', 'status', 'method', 'context', 'uri',  'latency', 'requestcount'],
              
                data:
                [['service1', 'service4', 200, 'GET', 'follow', '/this/uri/is/fake', 0.9386, 3],
                ['service1', 'service3', 200, 'GET', 'tracks', '/this/uri/is/fake', 0.7336, 10]]
            }
            
            var result = serviceDependencyService.dataToFront(data);
            
            console.log(result);
            
            expect(result.length).toBe(2);
            expect(result[0].source).toBe('service1');
            expect(result[0].target).toBe('service4');
            expect(result[0].status).toBe(200);
            expect(result[0].method).toBe('GET');
            expect(result[0].context).toBe('follow');
            expect(result[0].uri).toBe('/this/uri/is/fake');
            expect(result[0].latency).toBe(0.9386);
            expect(result[0].requestcount).toBe(3);
            
        });
    });


})();