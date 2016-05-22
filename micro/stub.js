var fs = require("fs");

var stubs = [
  '{ "bytes": "171", "port": "49160", "origin":"service1", "destination": "service2" ,"request_uri":"/service1/service2", "time": "2016-05-21T20:26:31-03:00", "status_code": "200", "request_time": "0.002", "method": "GET"}',
  '{ "bytes": "171", "port": "49160", "origin":"service1", "destination": "service3" ,"request_uri":"/service1/service3", "time": "2016-05-21T20:26:31-03:00", "status_code": "200", "request_time": "0.002", "method": "GET"}',
  '{ "bytes": "171", "port": "49160", "origin":"service1", "destination": "service4" ,"request_uri":"/service1/service4", "time": "2016-05-21T20:26:31-03:00", "status_code": "200", "request_time": "0.002", "method": "GET"}',
  '{ "bytes": "171", "port": "49160", "origin":"service4", "destination": "service5" ,"request_uri":"/service4/service5", "time": "2016-05-21T20:26:31-03:00", "status_code": "200", "request_time": "0.002", "method": "GET"}',
  '{ "bytes": "171", "port": "49160", "origin":"service4", "destination": "service6" ,"request_uri":"/service4/service6", "time": "2016-05-21T20:26:31-03:00", "status_code": "200", "request_time": "0.002", "method": "GET"}',
  '{ "bytes": "171", "port": "49160", "origin":"service5", "destination": "service6" ,"request_uri":"/service5/service6", "time": "2016-05-21T20:26:31-03:00", "status_code": "200", "request_time": "0.002", "method": "GET"}'
]

for(var index in stubs){
  var stub = stubs[index];
  fs.writeFileSync('/usr/share/nginx/logs/access-odin.log', stub);
}


{ "bytes": "171", "port": "8080", "origin":"service1", "destination": "service2" ,"request_uri":"/service1/service2", "time": "2016-05-21T20:42:05-03:00", "status_code": "304", "request_time": "0.200", "method": "GET"}
{ "bytes": "171", "port": "8081", "origin":"service1", "destination": "service3" ,"request_uri":"/service1/service3", "time": "2016-05-21T20:42:05-03:00", "status_code": "304", "request_time": "0.010", "method": "GET"}
{ "bytes": "171", "port": "8082", "origin":"service1", "destination": "service4" ,"request_uri":"/service1/service4", "time": "2016-05-21T20:42:05-03:00", "status_code": "304", "request_time": "1.000", "method": "GET"}

{ "bytes": "171", "port": "9091", "origin":"service4", "destination": "service5" ,"request_uri":"/service1/service5", "time": "2016-05-21T20:42:05-03:00", "status_code": "304", "request_time": "0.300", "method": "GET"}
{ "bytes": "171", "port": "9092", "origin":"service4", "destination": "service5" ,"request_uri":"/service1/service6", "time": "2016-05-21T20:42:05-03:00", "status_code": "304", "request_time": "0.050", "method": "GET"}
{ "bytes": "171", "port": "9093", "origin":"service5", "destination": "service6" ,"request_uri":"/service1/service6", "time": "2016-05-21T20:42:05-03:00", "status_code": "304", "request_time": "0.100", "method": "GET"}