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

        var that = this;

        var promise = new Promise(function (resolve, reject) {
          try {

            that._userModel.Model()
                .findOne({email: email},
                function (err, doc) {
                  if (err) {
                    reject(err);
                  }

                  resolve(doc);
                });
          }
          catch (e) {
            reject(e);
          }
        });
        return promise;

      }

    };

  };

  module.exports = UserService;

})();