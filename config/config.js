(function() {
    const PropertiesReader = require('properties-reader');
    const properties = PropertiesReader('./config/properties.file');
    
    // Exporting our properties
    module.exports = properties;
})();