(function () {

  "use strict";

  var nconf = require('nconf');
  var path = require('path');

  var Config = function () {

    return {
      Initialize: function () {
        console.log('Config initialization.');
        nconf.argv()
            .env()
            .file({file: path.join(__dirname, 'config.json')});
      },
      Data: function () {
        return nconf;
      }

    };
  };

  module.exports = Config;

})();
