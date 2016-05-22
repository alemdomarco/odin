<img src="https://raw.github.com/maviteixeira/odin/master/odin.png" />

# The ODIN Project

Live demo:  https://odinx.herokuapp.com/

----------


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

The main goal is getting microservices request data using a reverse proxy as data source, nginx in our case and storing the data in a Graph Database while providing a nice way to visualize it.


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

## Running Odin:

There are two ways of running the application:

 1. Run it just to visualize the Graph data already available: 
  * npm install
  * npm start
 2. Run it to capture data and visualize the data:
  * npm start nginx (to lookup nginx access_log)

## Configuring Odin:

Configuration of the appliction is done through the file `config/properties.file`
```
[main]
odinLog = /usr/share/nginx/logs/access-odin.log
# these credentials are temporarily with readonly access. 
host = odin:passwd@odin.sb05.stations.graphenedb.com
port = 24789
```
**odinLog**: the path to the log file where Nginx will insert data and Odin will read from.
**host**: the host of Neo4j. 
**port**: the port of Neo4j.

### Nginx observations:

* For capturing data, the Nginx must be running on the same host as Odin. This is due to it currently only having one implementation of the data gathering unit, which relies on access to Nginx log files.

## Future Improvements

There are several things that we have considered as valuable improvements, but didn't yet have time to implement. They are:

* As of now, the consumption of the log data and the insertion into the Graph database are being done in a direct, synchronous way. We plan to introduce a queue in between to make te two steps independent and more resilient.
* Implementing more ways to consume the data from Nginx, enabling it to be on a different host than Odin.
* Implementing data producers for other reverse proxies.
* Implement a URI pattern extraction algorithm to aggregate requests for the same service, but different path parameters.
