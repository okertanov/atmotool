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

})(
    jQuery,
    (typeof exports !== 'undefined' ? exports : this['atmotool'] = {})
);
