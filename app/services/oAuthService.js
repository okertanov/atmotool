(function () {

  "use strict";

  var uuid = require('node-uuid');
  var querystring = require('querystring');
  var request = require('request');

  var Config = require('../config/config');

  var OAuthService = function () {

    return {

      GetOAuthRedirectObject: function (host) {
        var authUrl = 'https://api.netatmo.net/oauth2/authorize?';

        var oAuthObject = Config('oAuthAuthenticate');
        oAuthObject.state = uuid.v1();
        oAuthObject.redirect_uri = 'http://' + host + '/callback';

        var redirectUri = authUrl + querystring.stringify(oAuthObject);

        var oAuthRedirectObject = {
          'oauth_state': oAuthObject.state,
          'oauth_redirect': redirectUri
        };

        return oAuthRedirectObject;
      },

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
