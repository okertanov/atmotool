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

})(jQuery, (typeof exports !== 'undefined' ? exports : this['atmotool'] = {}));

function authenticate() {

  $.ajax({
    url: '/authenticate',
    method: 'POST',
    success: function (data, status) {
      console.log('Status: ', status);
      console.log('Data: ', data);
      $scope.serverData = data.data;
    },
    error: function (data, status) {
      console.log('Status: ', status);
      console.log('Data: ', data || 'Request failed');
    }

  });

}