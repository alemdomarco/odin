(function () {
    "use strict"

    const neo4j = require('node-neo4j');

    const host = 'odin:TgJfSRVRmyluxAsfDe4U@odin.sb05.stations.graphenedb.com';
    const port = 24789;


    class ServiceCallRepository {


        constructor() {
            this._db = new neo4j('http://' + host + ':' + port);
        }


        saveServiceCallData(data) {
            
            let query = 'create (:service { ip: "' + data.origin + 
            '"}) -[:calls {context: "' + data.context + '", time: "' + data.time + '", latency: "' + data.latency + 
            '", uri: "' + data.uri + '", status: "' + data.status + '", method: "' + data.method + '"}]-> (:service { ip: "' + data.destination + '", port: "' + data.port + '"})';
            
            this._db.cypherQuery(query, function (err, result) {
                if (err) throw err;

                console.log(result.data); // delivers an array of query results
                console.log(result.columns); // delivers an array of names of objects getting returned
            });
          
        }

    }
    
    module.exports = ServiceCallRepository;

    })();