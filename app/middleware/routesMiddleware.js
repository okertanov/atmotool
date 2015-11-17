(function () {

  "use strict";

  var express = require('express');
  var path = require('path');
  var cors = require('cors');

  var OAuthMiddleware = require('./oAuthmiddleware');

  var Routes = function () {
    console.log('Routes middleware initialization.');
    return {
      _server: null,
      _oAuthMiddleware: new OAuthMiddleware(),

      Initialize: function (server) {
        this._server = server;
        this._oAuthMiddleware.Initialize(server);

        this._server.App().all('*', this._oAuthMiddleware.AllRequests());
        this._server.App().get('/', this.GetRoot());
        this._server.App().use(express.static(path.resolve('wwwroot')));

        this._server.App().use(this.OnError());
        this._server.App().use(this._oAuthMiddleware.OnError());

        this._server.App().post('/signin', this._oAuthMiddleware.SignIn());

        this._server.App().get('/authenticate', cors({origin: 'http://localhost:3000'}), this._oAuthMiddleware.Authenticate());

        this._server.App().get('/callback', this._oAuthMiddleware.Callback());

      },
      GetRoot: function () {
        var that = this;
        return function (req, res, next) {
          console.log('Request: ', req.path, req.ip);
          res.sendStatus(403);
        }
      },

      OnError: function () {
        var that = this;
        return function (err, req, res, next) {
          console.log('Unexpected auth error with request: ', req.path, err, err.stack);
          res.sendStatus(500);
        }
      }

    };
  };

  module.exports = Routes;

})();
