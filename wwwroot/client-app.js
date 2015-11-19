(function ($, exports) {

  "use strict";

  String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
  };

  $(function () {
    try {
      console.log('Initializing...');
    }
    catch (e) {
      console.log(e, e.toString());
    }
  });

  exports.authenticate = function authenticate() {
    $.get('/authenticate')
        .done(function (data, status, defered) {
          console.log('Authenticate Request data:', data, defered);
          var redirectUri = data.oauth_redirect;

          if (redirectUri) {
            atmotool.navigate(redirectUri);
          }
          console.log('Navigated to:', redirectUri);
        })
        .fail(function (status) {
          console.log('Authenticate Request failed:', status);
        });
  };

  exports.navigate = function navigate(url) {
    window.location = url || '#';
  };

})(jQuery, (typeof exports !== 'undefined' ? exports : this['atmotool'] = {}));
