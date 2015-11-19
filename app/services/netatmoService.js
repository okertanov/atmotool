(function () {
  "use strict";

  var request = require('request');
  var qs = require('querystring');
  var Promise = require('promise');

  var NetatmoService = function () {

    return {

      MakeApiUrl: function (action, accessToken) {
        var apiUrl = 'https://api.netatmo.com/api';
        var query = qs.stringify({access_token: accessToken});
        return apiUrl + '/' + action + '?' + query;
      },

      GetUser: function (accessToken) {
        var that = this;
        var promise = new Promise(function (resolve, reject) {
          try {

            var url = that.MakeApiUrl('getuser', accessToken);
            request.post({
                  url: url,
                  json: true
                },
                function (err, resp, body) {
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

    }

  };

  module.exports = NetatmoService;

})();
