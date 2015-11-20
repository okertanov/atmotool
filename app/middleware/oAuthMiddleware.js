(function () {

  "use strict";

  var uuid = require('node-uuid');
  var querystring = require('querystring');
  var path = require('path');

  var Config = require('../config/config');

  var OAuthService = require('../services/oAuthService');
  var NetatmoService = require('../services/NetatmoService');

  var OAuthMiddleware = function () {
    console.log('OAuth middleware initialization.');
    return {
      _oAuthService: new OAuthService(),
      _netatmoService: new NetatmoService(),

      Initialize: function () {
      },

      AllRequests: function () {
        var that = this;
        return function (req, res, next) {
          console.log('Auth: ', req.path, req.ip);

          if (req.path == '/auth.html') {

            var path = path.resolve('wwwroot') + '/auth.html';

            res.sendfile(path);

          }

          var cookie = req.cookies.atmotool;

          if (cookie) {
            that._netatmoService.GetUser(cookie.access_token)
                .then(function (user) {
                  if (user) {
                    next();
                  }
                  else {
                    var path = path.resolve('wwwroot') + '/auth.html';
                    res.sendfile(path);
                  }
                });
          } else {
            var path = path.resolve('wwwroot') + '/auth.html';
            res.sendfile(path);
          }
        };
      },

      SignIn: function () {
        var that = this;
        return function (req, res, next) {

          var oAuthSignIn = Config('oAuthSignIn');
          oAuthSignIn.grant_type = "password";
          oAuthSignIn.username = req.body.email;
          oAuthSignIn.password = req.body.password;

          that._oAuthService.SignIn(oAuthSignIn)
              .then(function (authToken) {
                if (authToken) {
                  res.status(200).json(JSON.parse(authToken));
                }
                res.send(401);
              }).catch(function (reason) {
                console.err('Access Token receiving error:', reason);
                res.status(401).json(reason);
              })
        }
      },

      Authenticate: function () {
        var that = this;
        return function (req, res, next) {
          var oAuthRedirectObject = that._oAuthService.GetOAuthRedirectObject(req.headers.host);
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

          that._oAuthService.GetAccessToken(oAuthExchange)
              .then(function (accessToken) {

                var cookieOptions = that.MakeCookie(accessToken);
                res.cookie('atmotool', cookieOptions);

                that._netatmoService.GetUser(accessToken.access_token)
                    .then(function (user) {
                      res.status(200);
                    });

              })
              .catch(function (reason) {
                res.clearCookie('atmotool');
                res.status(401).json(reason);
              });
        }
      },

      RefreshToken: function () {
        var that = this;
        return function (req, res, next) {

          var oAuthRefresh = Config('oAuthRefresh');
          oAuthRefresh.refresh_token = req.cookies.refresh_token;

          that._oAuthService.RefreshToken(oAuthRefresh)
              .then(function (accessToken) {

                res.clearCookie('atmotool');
                var cookieOptions = that.MakeCookie(accessToken);
                res.cookie('atmotool', cookieOptions);

                that._netatmoService.GetUser(accessToken.access_token)
                    .then(function (user) {
                      res.status(200);
                    });

              })
              .catch(function (reason) {
                res.clearCookie('atmotool');
                res.status(401).json(reason);
              });
        }

      },

      MakeCookie: function (accessToken) {
        return {
          access_token: accessToken.access_token,
          refresh_token: accessToken.refresh_token,
          expires: new Date(Date.now() + accessToken.expires_in * 1000)
        };
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

  module.exports = OAuthMiddleware;

})();
