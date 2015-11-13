(function () {

  "use strict";

  var express = require('express');
  var path = require('path');

  var Routes = function () {
    console.log('Routes middleware initialization.');
    return {
      _server: null,

      Initialize: function (server) {
        this._server = server;

        this._server.App().get('/', this.GetRoot());
        this._server.App().use(express.static(path.resolve('wwwroot')));

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
