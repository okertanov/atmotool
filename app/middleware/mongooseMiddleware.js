(function () {

  "use strict";

  var mongoose = require('mongoose');

  var MongooseMiddleware = function () {
    console.log('Mongoose middleware initialization.');
    return {
      _server: null,
      _mongoose: null,

      Initialize: function (server) {
        this._server = server;
        this._mongoose = mongoose;

        var connectionString = this._server.Config().get('db:connectionString');
        var options = this._server.Config().get('db:options');

        mongoose.connect(connectionString, options);

      }
    };
  };

  module.exports = MongooseMiddleware;

})();
