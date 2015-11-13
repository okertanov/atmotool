(function () {

  "use strict";

  var express = require('express');
  var path = require('path');

  var OAuthMiddleware = require('./oAuthmiddleware');

  var Routes = function () {
    console.log('Routes middleware initialization.');
    return {
      _server: null,
      _oAuthMiddleware: new OAuthMiddleware(),

      Initialize: function (server) {
        this._server = server;


        this._server.App().all('*', this._oAuthMiddleware.AllRequests());
        this._server.App().get('/', this.GetRoot());
        this._server.App().use(express.static(path.resolve('wwwroot')));

        this._server.App().post('/signin', this._oAuthMiddleware.SignIn());

        this._oAuthMiddleware.Initialize(server);

      },
      GetRoot: function () {
        var that = this;
        return function (req, res, next) {
          console.log('Request: ', req.path, req.ip);
          res.sendStatus(403);
        }
      }

    };
  };

  module.exports = Routes;

})();
