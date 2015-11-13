(function () {

  "use strict";

  var http = require('http');
  var express = require('express');

  var path = require('path');

  var Config = require('./config/config');
  var MainMiddleware = require('./middleware/mainMiddleware');
  var RoutesMiddleware = require('./middleware/routesMiddleware');
  var MongooseMiddleware = require('./middleware/mongooseMiddleware');

  var Server = function () {
    console.log('Server initialization.');
    return {
      _server: null,
      _app: express(),
      _config: new Config(),

      _mainMiddleware: new MainMiddleware(),
      _routesMiddleware: new RoutesMiddleware(),
      _mongooseMiddleware: new MongooseMiddleware(),

      Initialize: function () {
        this._config.Initialize();
        this._mainMiddleware.Initialize(this);
        this._routesMiddleware.Initialize(this);
        this._mongooseMiddleware.Initialize(this);
      },
      Start: function () {
        var that = this;
        this._server = this._app
            .listen(
            this._config.Data().get('port'),
            this._config.Data().get('host'),
            function () {
              var bind_host = that._server.address().address;
              var bind_port = that._server.address().port;
              console.log('App listening at %s:%s', bind_host, bind_port);
            });

      },
      App: function () {
        return this._app;
      },
      Config: function () {
        return this._config.Data();
      }

    };
  };

  module.exports = Server;

})();
