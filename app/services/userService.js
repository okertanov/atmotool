(function () {

  "use strict"

  var mongoose = require('mongoose');
  var User = require('../models/user');
  var Promise = require('promise');

  var UserService = function () {

    return {
      _userModel: new User(),

      Save: function (user) {
        this._userModel.Instance(user)
            .save(function (err, user, numAffected) {
              console.log(arguments);
            });
      },

      GetByEmail: function (email) {
        this._userModel.Model().findOne({email: email})
            .exec(function (err, user) {
              if (err) {
                return undefined;
              }
              return user;
            });
      }

    };

  };

  module.exports = UserService;

})();