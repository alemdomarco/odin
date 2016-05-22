# Project ODIN

## Introduction

The God Odin, bored by the lack of Vicking wars, decided to monitor microservices, their interactions and dependencies.

Thus, this project was created aimming to address the following points: 

* Build a system using Graph DB to represent microservice dependency graph. 
* Imagine 100s of microserivces calling each other on different API endpoints using REST: 
  * How would you know which service depends on another? 
  * How often API calls are being made from one service to another? 
  * Does one service always call all endpoints of another service, or usually just one or two etc?

Our approach at solving the problem tries to be the least intrusive possible on the microservices being monitored, so they 
don't need to change their code in order to provide the information we want to track.

With this premise in mind we decided to track the information available at the reverse proxy, a component that many microservice architetures use to provide their API gateway and load balancing. 

By listening to the requests that passes through the proxy we can collect the following data, among others:

* host originating the request
* host receiving the request
* date and time
* latency
* http method
* response status

We decided to use the most known reverse proxy, Nginx and the most used Graph based DB, Neo4j to store the data. 

## Long story short

The main goal is getting microservices request data using a reverse proxy as data source, nginx in our case and storing in a Graph Database.


## Nginx configuration

### Configure Nginx:

Add the following entry to the nginx.conf: 
```
log_format  odin  '{ "bytes": "$bytes_sent", "port": "$proxy_port", "origin":"$remote_addr", "destination": "$proxy_host" ,"request_uri":"$request_uri", "time": "$time_iso8601", "status_code": "$status", "request_time": "$request_time", "method": "$request_method"} ';
```

Enable accesslog on nginx:
```
access_log  logs/access-odin.log  odin;
```

## To run the application just follow the commands below:

There are two ways of running the application:
* 

* npm install
* npm start

Thes
* npm start nginx (to lookup nginx access_log)