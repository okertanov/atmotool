(function () {

    "use strict";

    var http = require('http');
    var express = require('express');

    var path = require('path');

    var config = require('./config');
    var middleware = require('./middleware');
    var logger = require('./services/logger');

    var Server = function () {
        return {
            _server: null,
            _app: express(),

            _config: new config(),
            _logger: new logger(),

            Initialize: function () {
                this._logger.Initialize();
                this._config.Initialize();
            },

            Listen: function () {
                console.log('Server initialization.');
                var that = this;
                this._server = this._app
                    .listen(
                    this._config.Data().get('port'),
                    this._config.Data().get('host'),
                    function () {
                        var bind_host = that._server.address().address;
                        var bind_port = that._server.address().port;
                        that._logger.Log('App listening at %s:%s', bind_host, bind_port);
                    });
            },
            App: function () {
                return this._app;
            },
            Config: function () {
                return this._config;
            },
            Logger: function () {
                return this._logger;
            }

        };
    };

    module.exports = Server;

})();
