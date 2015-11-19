(function () {

  "use strict";

  var uuid = require('node-uuid');
  var querystring = require('querystring');

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

          var promise = that._userService.GetByEmail(req.body.email);

          promise.then(function (err, user) {
            if (err) {
              console.log(err);
            }
            if (user) {
              res.sendStatus(200).json(user);
            }
            res.sendStatus(404);
          });

        }
      },

      Authenticate: function () {
        var that = this;
        return function (req, res, next) {

          var oAuthObject = Config('oAuthAuthenticate');

          oAuthObject.state = uuid.v1();
          oAuthObject.redirect_uri = 'http://' + req.headers.host + '/callback';

          var qs = querystring.stringify(oAuthObject);

          var authApiUrl = that._oAuthService.GetAuthUrl();
          var redirectUri = authApiUrl + qs;

          console.log('Redirecting to:', redirectUri);

          var oAuthRedirectObject = {
            'oauth_state': oAuthObject.state,
            'oauth_endpoint': authApiUrl,
            'oauth_redirect': redirectUri
          };

          res.json(oAuthRedirectObject);
        }
      },

      Callback: function () {
        var that = this;
        return function (req, res, next) {
          var code = req.query.code || '';
          var state = req.query.state || '';

          var oAuthExchange = Config('oAuthExchange');
          oAuthExchange.code = code;

          oAuthExchange.redirect_uri = 'http://' + req.headers.host + '/callback';

          console.log('Getting Access Code with:', oAuthExchange);

          that._oAuthService.GetAccessToken(oAuthExchange)
              .then(function (accessToken) {
                console.log('Access Token received:', accessToken);
                res.status(200).json(accessToken);
              })
              .catch(function (reason) {
                console.err('Access Token receiving error:', reason);
                res.status(401).json(reason);
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
