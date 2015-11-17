//
// AuthMiddleware.js
//

(function () {

  "use strict";

  var uuid = require('node-uuid');

  var Config = require('../config/config');

  var UserService = require('../services/userService');
  var OAuthService = require('../services/oAuthService');

  var OAuthMiddleware = function () {
    console.log('OAuth middleware initialization.');
    return {
      _server: null,
      _userService: new UserService(),
      _oAuthService: new OAuthService(),

      Initialize: function (server) {
        this._server = server;
      },

      AllRequests: function () {
        var that = this;
        return function (req, res, next) {
          console.log('Auth: ', req.path, req.ip);
          next();
        }
      },

      SignIn: function () {
        var that = this;
        return function (req, res, next) {
          that._userService.GetByEmail(req.body.email)
              .then(function (user) {
                if (!user) {

                  var oAuthSignIn = Config('oAuthSignIn');
                  oAuthSignIn.grant_type = "password";
                  oAuthSignIn.username = req.body.email;
                  oAuthSignIn.password = req.body.password;

                  return that._oAuthService.SignIn(oAuthSignIn);
                }
                return user.authToken;
              }).then(function (user) {
                res.send(user);
              });
        }

      },

      Authenticate: function () {
        var that = this;
        return function (req, res, next) {

          var state = uuid.v1();

          var oAuthObject = Config('oAuthAuthenticate');
          oAuthObject.state = state;

          that._oAuthService.Authenticate(oAuthObject)
              .then(function (response) {

                var redirectUri = response.request.uri.href;
                res.redirect(redirectUri);
              });
        }
      },

      Callback: function (state, generated) {
        var that = this;
        return function (req, res, next) {

          var oAuthExchange = Config('oAuthExchange');
          oAuthExchange.code = generated;

          that._oAuthService.Callback(oAuthExchange)
              .then(function (oAuthToken) {
                res.send(200, oAuthToken);
              });
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

  //
  // Module Exports
  //
  module.exports = OAuthMiddleware;

})();


