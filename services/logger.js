(function () {

    "use strict";

    var Log = function () {
        return {
            Initialize: function () {
                console.log('Log initialization.');
            },
            Log: function () {
                console.log.apply(console, arguments);
            }
        };
    };

    module.exports = Log;

})();
