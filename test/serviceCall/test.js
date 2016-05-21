(function () {
    "use strict"

    const ServiceCallRepository = require("./service-call-repository");

    var service = new ServiceCallRepository();

    let data = { "bytes": "281", "port": "9020", "origin": "127.0.0.1", "destination": "127.0.0.1", "request_uri": "/m2/", "time": "2016-05-21T15:38:08-03:00", "status_code": "200", "request_time": "0.035", "method": "GET" };

    service.saveServiceCallData(data);

})();