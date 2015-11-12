(function () {

    "use strict";

    var Routes = function () {
        return {

            _server: null,

            Initialize: function (server) {
                console.log('Routes initialization.');

                this._server = server;

            }
        };
    };

    module.exports = Routes;

})();
