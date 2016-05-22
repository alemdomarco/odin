(function () {
    "use strict"

    const Neo4j = require('node-neo4j');
    const Q = require('q');

    const host = 'odin:HfJJHr3KTI5CTj7G4A9t@odin.sb05.stations.graphenedb.com';
    const port = 24789;


    class ServiceDependencyRepository {


        constructor() {
            this._db = new Neo4j('http://' + host + ':' + port);
        }


        saveServiceCallData(data) {
            var db = this._db;

            Q.all([
                this.findOrCreateNodeByHost(data.origin),
                this.findOrCreateNodeByHost(data.destination)
            ]).then(function () {

                let query = 'match (s1:service), (s2:service) ' +
                    'where s1.host = "' + data.origin + '" and s2.host = "' + data.destination + '" ' +
                    'create (s1) -[:calls {context: "' + data.context + '", time: "' + data.time + '", latency: "' + data.latency +
                    '", uri: "' + data.uri + '", status: "' + data.status + '", method: "' + data.method + '"}]-> (s2)';

                db.cypherQuery(query, function (err, result) {
                    if (err) throw err;
                });

            });

        }

        findOrCreateNodeByHost(host) {
            var deferred = Q.defer();
            var db = this._db;

            let originquery = 'match (s:service { host: "' + host + '"}) return s';
            db.cypherQuery(originquery, function (err, result) {
                if (err) throw err;

                if (result.data.length < 1) {
                    db.cypherQuery('create (:service { host:  "' + host + '"})', function (err, result) {
                        if (err) throw err;
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        }

        findOrCreateNodeByHostAndPort(host, port) {
            var deferred = Q.defer();
            var db = this._db;

            let destinationquery = 'match (s:service { host: "' + host + '", port: "' + port + '"}) return s';
            db.cypherQuery(destinationquery, function (err, result) {
                if (err) throw err;

                if (result.data.length < 1) {
                    db.cypherQuery('create (s:service { host: "' + host + '", port: "' + port + '"})', function (err, result) {
                        if (err) throw err;
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        }

        findDependenciesOfHost(host) {
            var deferred = Q.defer();
            var db = this._db;

            let query = 'match (s1:service { host: "' + host + '"}) -[c:calls]-> (s2:service) return s1, s2, c';
            db.cypherQuery(query, function (err, result) {
                if (err) throw err;

                deferred.resolve(result);

            });
            return deferred.promise;
        }

        findAggDependenciesOfHost(host) {
            var deferred = Q.defer();
            var db = this._db;

            let query = 'match (s1:service {host: "' + host + '"}) -[c:calls]-> (s2:service) return DISTINCT s1.host, s2.host, c.status, c.method, c.context, c.uri, avg(toFloat(c.latency)), count(c)';
            db.cypherQuery(query, function (err, result) {
                if (err) throw err;

                deferred.resolve(result);

            });
            return deferred.promise;
        }
        
        findAggAll() {
            var deferred = Q.defer();
            var db = this._db;
            var that = this;

            let query = 'match (s1:service) -[c:calls]-> (s2:service) return DISTINCT s1.host, s2.host, avg(toFloat(c.latency)), count(c)';
            db.cypherQuery(query, function (err, result) {
                if (err) throw err;

                deferred.resolve(result);

            });
            return deferred.promise;
        }
        
        dataToGraph(data) {
            var minLatency = Number.MAX_VALUE;
            var maxLatency = 0.0;
            var minCount = Number.MAX_VALUE;
            var maxCount = 0;
            var nodes = [];
            var edges = [];
            
            for(var i in data) {
                minLatency = (data[i][2] < minLatency)? data[i][2] : minLatency;
                maxLatency = (data[i][2] > maxLatency)? data[i][2] : maxLatency;
                minCount = (data[i][3] < minCount)? data[i][3] : minCount;
                maxCount = (data[i][3] > maxCount)? data[i][3] : maxCount;
                if(nodes.indexOf(data[i][0]) < 0) {
                    nodes.push({ id: data[i][0], label: data[i][0]}) ;
                }
                if(nodes.indexOf(data[i][1]) < 0) {
                    nodes.push({ id: data[i][1], label: data[i][1]}) ;
                }
            }
            
            //Normalizing values of latency and count between 0 and 1
            for(var i in data) {
                let edge = {
                    id: i,
                    source: data[i][0],
                    target: data[i][1],
                    latency: (data[i][2] - minLatency) / (maxLatency - minLatency),
                    count: (data[i][3] - minCount) / (maxCount - minCount),
                }
                
                edges.push(edge);
            }
            
            var result = {
                nodes: nodes,
                edges: edges,
                minLatency: minLatency,
                maxLatency: maxLatency,
                minCount: minCount,
                maxCount: maxCount
            }
            
            return result;
        }        
    }

    module.exports = ServiceDependencyRepository;

})();