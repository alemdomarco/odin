(function () {
    "use strict"

    const Neo4j = require('node-neo4j');
    const Q = require('q');

    const host = 'odin:HfJJHr3KTI5CTj7G4A9t@odin.sb05.stations.graphenedb.com';
    const port = 24789;


    class ServiceCallRepository {


        constructor() {
            this._db = new Neo4j('http://' + host + ':' + port);
        }


        saveServiceCallData(data) {
            var db = this._db;

            Q.all([
                this.findOrCreateNodeByIP(data.origin),
                this.findOrCreateNodeByIP(data.destination)
            ]).then(function () {

                let query = 'match (s1:service), (s2:service) ' +
                    'where s1.ip = "' + data.origin + '" and s2.ip = "' + data.destination + '" ' +
                    'create (s1) -[:calls {context: "' + data.context + '", time: "' + data.time + '", latency: "' + data.latency +
                    '", uri: "' + data.uri + '", status: "' + data.status + '", method: "' + data.method + '"}]-> (s2)';

                db.cypherQuery(query, function (err, result) {
                    if (err) throw err;
                });
                
            });

        }

        findOrCreateNodeByIP(ip) {
            var deferred = Q.defer();
            var db = this._db;

            let originquery = 'match (s:service { ip: "' + ip + '"}) return s.ip';
            db.cypherQuery(originquery, function (err, result) {
                if (err) throw err;
                
                if (result.data.length < 1) {
                    db.cypherQuery('create (:service { ip:  "' + ip + '"})', function (err, result) {
                        if (err) throw err;
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
               
            });
            return deferred.promise;
        }

        findOrCreateNodeByIpAndPort(ip, port) {
            var deferred = Q.defer();
            var db = this._db;

            let destinationquery = 'match (s:service { ip: "' + ip + '", port: "' + port + '"}) return s.ip, s.port';
            db.cypherQuery(destinationquery, function (err, result) {
                if (err) throw err;

                if (result.data.length < 1) {
                    db.cypherQuery('create (s:service { ip: "' + ip + '", port: "' + port + '"})', function (err, result) {
                        if (err) throw err;
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        }
    }


    module.exports = ServiceCallRepository;

})();