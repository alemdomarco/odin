Here is description of this challenge: 

Build a system using Graph DB to represent microservice dependency graph. 
Imagine 100s of microserivces calling each other on different API endpoints using REST, 

* How would you know which service depends on another? 
* How often API calls are being made from one service to another? 
* Does one service always call all endpoints of another service, or usually just one or two etc�?

This is an open ended challenge, only requirement is mentioned above, use your imagination and do whatever you need to solve the problem mentioned



## Main ideia long story short

The main goal is getting microservices data using a reverse proxy as data source, nginx in our case.



## Nginx configuration

# You need to add this log_format for access log:
log_format  odin  '{ "bytes": "$bytes_sent", "port": "$proxy_port", "origin":"$remote_addr", "destination": "$proxy_host" ,"request_uri":"$request_uri", "time": "$time_iso8601", "status_code": "$status", "request_time": "$request_time", "method": "$request_method"} ';

# Enable accesslog on nginx
access_log  logs/access-odin.log  odin;


## To run the application just follow the commands below:

* npm install
* node index.js
* node index.js nginx (to lookup nginx access_log)