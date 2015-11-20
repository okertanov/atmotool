(function () {

  "use strict";

  var express = require('express');
  var path = require('path');
  var cors = require('cors');

  var OAuthMiddleware = require('./oAuthMiddleware');

  var Routes = function () {
    console.log('Routes middleware initialization.');
    return {
      _server: null,
      _oAuthMiddleware: new OAuthMiddleware(),
      _rootName: '/',
      _indexName: '/index.html',

      Initialize: function (server) {
        this._server = server;
        this._oAuthMiddleware.Initialize(server);

        this._server.App().get(this._rootName, this.GetRoot());
        this._server.App().get(this._indexName, this._oAuthMiddleware.IndexRequest());
        this._server.App().use(express.static(path.resolve('wwwroot')));
         this._server.App().post('/signin', this._oAuthMiddleware.SignIn());
        this._server.App().get('/authenticate', cors({origin: '*'}), this._oAuthMiddleware.Authenticate());
        this._server.App().get('/callback', this._oAuthMiddleware.Callback());
        this._server.App().get('/refresh', this._oAuthMiddleware.RefreshToken());
        
        this._server.App().all('*', this._oAuthMiddleware.AllRequests());
        
        this._server.App().post('/me', this._oAuthMiddleware.Me());        
        
        this._server.App().use(this.OnError());
      },

      GetRoot: function () {
        var that = this;
        return function (req, res, next) {
          console.log('Request: ', req.path, req.ip);
          res.redirect(that._indexName);
        }
      },

      OnError: function () {
        return function (err, req, res, next) {
          var errorHandler = express.errorHandler();
          errorHandler(err, req, res, next);
        }
      }

    };
  };

  module.exports = Routes;

})();
