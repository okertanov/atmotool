(function () {

    "use strict";

    var Server = require('./server');
    var server = new Server();
    server.Initialize();
    server.Listen();

    var Middleware = require('./middleware');
    var middleware = new Middleware();
    middleware.Initialize(server);
    middleware.Mongoose();

    var Routes = require('./routes');
    var routes = new Routes();
    routes.Initialize(server);

})();