(function () {

  "use strict";

  var express = require('express');
  var body_parser = require('body-parser');
  var cookie_parser = require('cookie-parser');

  var Middleware = function () {
    console.log('Main middleware initialization.');
    return {
      _server: null,

      Initialize: function (server) {
        this._server = server;

        this._server.App().use(cookie_parser());

        this._server.App().use(body_parser.json());
        this._server.App().use(body_parser.urlencoded({extended: true}));

      }
    };
  };

  module.exports = Middleware;

})();
