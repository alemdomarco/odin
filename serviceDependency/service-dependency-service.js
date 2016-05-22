(function () {
    "use strict"

    const Q = require('q');
    const ServiceDependencyRepository = require("./service-dependency-repository");

    class ServiceDependencyService {

        constructor() {
            this._repository = new ServiceDependencyRepository();
        }

        findAggregatedAll() {
            var deferred = Q.defer();
            var that = this;
            this._repository.findAggAll().then(function (result) {
                deferred.resolve(that.dataToGraph(result.data));
            });

            return deferred.promise;
        }

        findAggregatedDependenciesOfHost(host) {
            var deferred = Q.defer();
            var that = this;
            this._repository.findAggDependenciesOfHost(host).then(function (result) {
                deferred.resolve(that.dataToFront(result));
            });

            return deferred.promise;
        }

        findAllDependencyCallsOfHost(host) {
            var deferred = Q.defer();
            var that = this;
            this._repository.findDependenciesOfHost(host).then(function (result) {
                deferred.resolve(that.dataToFront(result));
            });

            return deferred.promise;
        }


        dataToFront(resultSet) {
            let dictionary = {
                'host1': 'source',
                'host2': 'target'
            }

            let result = [];

            for (var i in resultSet.data) {
                let record = {};
                for (var j in resultSet.columns) {
                    let column = resultSet.columns[j];
                    let key = dictionary[column] ? dictionary[column] : column;
                    record[key] = resultSet.data[i][j];
                }
                result.push(record);
            }

            return result;
        }

        dataToGraph(data) {
            var minLatency = Number.MAX_VALUE;
            var maxLatency = 0.0;
            var minCount = Number.MAX_VALUE;
            var maxCount = 0;
            var nodes = [];
            var edges = [];
            var nodeNames = [];

            for (var i in data) {
                minLatency = (data[i][2] < minLatency) ? data[i][2] : minLatency;
                maxLatency = (data[i][2] > maxLatency) ? data[i][2] : maxLatency;
                minCount = (data[i][3] < minCount) ? data[i][3] : minCount;
                maxCount = (data[i][3] > maxCount) ? data[i][3] : maxCount;
                if (nodeNames.indexOf(data[i][0]) < 0) {
                    nodeNames.push(data[i][0]);
                    nodes.push({ id: data[i][0], label: data[i][0] });
                }
                if (nodeNames.indexOf(data[i][1]) < 0) {
                    nodeNames.push(data[i][1]);
                    nodes.push({ id: data[i][1], label: data[i][1] });
                }
            }

            //Normalizing values of latency and count between 0 and 1
            for (var i in data) {
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

    module.exports = ServiceDependencyService;
})();