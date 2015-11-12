(function () {

    "use strict";

    var fs = require('fs');
    var path = require('path');
    var jsonfile = require('jsonfile');
    var util = require('util');
    var mongoose = require('mongoose');

    var User = function () {
        return {
            _schema: null,
            _model: null,

            Initialize: function () {
                console.log('user object initialization.');

                var fullname = path.join(__dirname, 'user.json');

                /*var Schema = mongoose.Schema;
                that._schema = new Schema(data);
                that._model = mongoose.model('user', this._schema);*/


                jsonfile.readFile(fullname, function(err, obj) {
                    console.log(obj)
                });

                console.log(fullname);

            },
            Schema: function () {
                return this._schema;
            },
            Model: function () {
                return this._model;
            }
        };
    };

    module.exports = User;

})();
