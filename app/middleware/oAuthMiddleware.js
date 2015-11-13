//
// AuthMiddleware.js
//

(function () {

  "use strict";

  var OAuthMiddleware = function () {
    console.log('OAuth middleware initialization.');
    return {
      _server: null,

      Initialize: function (server) {
        this._server = server;
      },
      AllRequests: function () {
        var that = this;
        return function (req, res, next) {
          that._server.Log('Auth: ', req.path, req.ip);
          next();
        }
      },

      OnError: function () {
        var that = this;
        return function (err, req, res, next) {
          that._server.Log('Unexpected auth error with request: ', req.path, err, err.stack);
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
