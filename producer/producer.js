(function () {
  "use strict"

  const Tail = require('tail').Tail;
  
  var tail = new Tail("/usr/share/nginx/logs/access-odin.log");

  tail.on("line", function(data) {
    console.log("new line");
    var json = JSON.parse(data);
    console.log(json);
  });

  tail.on("error", function(error) {
    console.log('ERROR: ', error);
  });
})();