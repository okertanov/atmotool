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

      GetAuthUrl: function () {
        var authUrl = 'https://api.netatmo.net/oauth2/authorize?';
        return authUrl;
      },

      GetAccessToken: function (oAuthExchange) {
        var promise = new Promise(function (resolve, reject) {
          try {
            console.log('Getting Access Token Post request:', oAuthExchange);
            request.post({
                  url: 'https://api.netatmo.net/oauth2/token',
                  json: true,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                  },
                  form: oAuthExchange
                },
                function (err, resp, body) {
                  console.log('Getting Access Token Post received response:', err, body);
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
