(function () {

  "use strict";

  var request = require('request');

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

      Callback: function (oAuthExchange) {

        var promise = new Promise(function (resolve, reject) {
          try {
            request({
                  url: 'https://api.netatmo.net/oauth2/token',
                  method: "POST",
                  headers: {"Content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
                  form: oAuthExchange
                }, function (err, result, body) {
                  if (err) {
                    reject(err);
                  }
                  resolve(body);
                }
            );
          }
          catch (e) {
            reject(e);
          }
        });
        return promise;

      }

    };

  };

  module.exports = OAuthService;

})();