(function () {
    "use strict"

    const properties = require('./../config/config.js');
    const Neo4j = require('node-neo4j');
    const Q = require('q');

    class ServiceDependencyRepository {


        constructor() {
             this._db = new Neo4j('http://' + properties.get('main.host') + ':' + properties.get('main.port'));
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

            let query = 'match (s1:service { host: "' + host + '"}) -[c:calls]-> (s2:service) return s1.host as host1, s2.host as host2, c.status as status, c.method as method, c.context as context, c.uri as uri, c.latency as latency';
            db.cypherQuery(query, function (err, result) {
                if (err) throw err;

                deferred.resolve(result);

            });
            return deferred.promise;
        }

        findAggDependenciesOfHost(host) {
            var deferred = Q.defer();
            var db = this._db;

            let query = 'match (s1:service {host: "' + host + '"}) -[c:calls]-> (s2:service) return DISTINCT s1.host as host1, s2.host as host2, c.status as status, c.method as method, c.context as context, c.uri as uri, avg(toFloat(c.latency)) as latency, count(c) as requestcount';
            db.cypherQuery(query, function (err, result) {
                if (err) deferred.error(err);

                deferred.resolve(result);

            });
            return deferred.promise;
        }

        findAggAll() {
            var deferred = Q.defer();
            var db = this._db;

            let query = 'match (s1:service) -[c:calls]-> (s2:service) return DISTINCT s1.host, s2.host, avg(toFloat(c.latency)), count(c)';
            db.cypherQuery(query, function (err, result) {
                if (err) throw err;
                deferred.resolve(result);

            });
            return deferred.promise;
        }




    }

    module.exports = ServiceDependencyRepository;

})();