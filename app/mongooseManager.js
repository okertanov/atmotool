(function () {

  "use strict";

  var mongoose = require('mongoose');
  var Config = require('./config/config');

  var MongooseManager = function () {
    console.log('Mongoose middleware initialization.');
    return {
      _server: null,
      _mongoose: null,

      Initialize: function (server) {
        this._server = server;
        this._mongoose = mongoose;

        var connectionString = Config('db:connectionString');
        var options = Config('db:options');

        mongoose.connect(connectionString, options);
      }
    };
  };

  module.exports = MongooseManager;

})();
