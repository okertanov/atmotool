(function () {

  "use strict";

  var request = require('request');
  var Config = require('../config/config');

  var OAuthService = function () {

    return {

      SignIn: function (oAuthSignIn) {
        var promise = new Promise(function (resolve, reject) {
          try {

            request({
              url: 'https://api.netatmo.net/oauth2/token',
              method: "POST",
              headers: {"Content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
              form: oAuthSignIn
            }, function (err, result, body) {
              if (err) {
                reject(err);
              }
              resolve(body);
            });
          }
          catch (e) {
            reject(e);
          }
        });
        return promise;
      },

      Authenticate: function () {
        var promise = new Promise(function (resolve, reject) {
          try {
            request({
              url: ' https://api.netatmo.net/oauth2/authorize',
              qs: Config('oAuthAuthorizationCode'),
              method: 'GET',
            }, function (err, response, body) {
              if (err) {
                reject(err);
              }
              resolve(response);
            });
          }
          catch (e) {
            reject(e);
          }
        });
        return promise;

      },

      Exchange: function () {

      }

    };

  };

  module.exports = OAuthService;

})();