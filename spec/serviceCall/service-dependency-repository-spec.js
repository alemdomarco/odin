(function () {

    "use strict"

    const ServiceDependencyRepository = require("./../../serviceCall/service-dependency-repository");

    var serviceDependencyRepository = new ServiceDependencyRepository();

    var data = {
      columns: [],
      data: [[
        ""
      ],[
          
      ]]
    }

    var graph = serviceDependencyRepository.dataToGraph(data);
    
    

})();