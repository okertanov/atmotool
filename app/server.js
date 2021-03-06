(function () {

  "use strict";

  var http = require('http');
  var express = require('express');

  var Config = require('./config/config');
  var MainMiddleware = require('./middleware/mainMiddleware');

  var Server = function () {
    console.log('Server initialization.');
    return {
      _server: null,
      _app: express(),
      _mainMiddleware: new MainMiddleware(),

      Initialize: function () {
        this._mainMiddleware.Initialize(this);
      },
      Start: function () {

        var that = this;
        this._server = this._app
            .listen(
            Config('port'),
            Config('host'),
            function () {
              var bind_host = that._server.address().address;
              var bind_port = that._server.address().port;
              console.log('App listening at %s:%s', bind_host, bind_port);
            });

      },
      App: function () {
        return this._app;
      }
    };
  };

  module.exports = Server;

})();
