(function () {

  "use strict";

  var express = require('express');
  var body_parser = require('body-parser');
  var cookie_parser = require('cookie-parser');

  var RoutesMiddleware = require('./routesMiddleware');

  var MainMiddleware = function () {
    console.log('Main middleware initialization.');
    return {
      _server: null,
      _routesMiddleware: new RoutesMiddleware(),

      Initialize: function (server) {
        this._server = server;

        this._server.App().use(cookie_parser());
        this._server.App().use(body_parser.json());
        this._server.App().use(body_parser.urlencoded({extended: true}));

        this._routesMiddleware.Initialize(server);
      }
    };
  };

  module.exports = MainMiddleware;

})();
