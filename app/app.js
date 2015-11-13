(function () {

  "use strict";

  var Server = require('./server');

  var server = new Server();
  server.Initialize();
  server.Start();

})();