(function () {

    "use strict";

    var express = require('express');
    var mongoose = require('mongoose');
    var body_parser = require('body-parser');
    var cookie_parser = require('cookie-parser');
    var path = require('path');

    var Middleware = function () {

        return {
            _server: null,
            _mongoose: null,

            Initialize: function (server) {
                console.log('Middleware initialization.');

                this._server = server;

                this._server.App().use(cookie_parser());

                this._server.App().use(body_parser.json());
                this._server.App().use(body_parser.urlencoded({extended: true}));

                this._server.App().set('views', path.join(__dirname, 'views'));
                this._server.App().set('view engine', 'hbs');

            },
            Mongoose: function () {
                mongoose.connect(
                    this._server.Config().get('db:connection') + '/' + this._server.Config().get('db:name'),
                    this._server.Config().get('db:options')
                );
                return mongoose;
            }

        };
    };

    module.exports = Middleware;

})();
