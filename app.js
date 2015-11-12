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

    var testuser = {
        username:"testuser1",
        email: "email1",
        authToken: {
            access_token: "access_token",
            refresh_token: "refresh_token",
            scope: "scope",
            expires_in: 0,
            expire_in: 0
        }
    };

    var user = user.Model()(testuser);

    user.save(function (err, user, numAffected) {
        console.log(numAffected);
    });

})();