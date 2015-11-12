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

    var User = require('./models/user');
    var user = new User();
    user.Initialize();

    var userModel = user.Model();

    var newUser = new userModel({username: "asd", email: "asd@sad"});

    newUser.safe(function () {
        log.info('created base admin user');
    });

    console.log("huyak");

})();