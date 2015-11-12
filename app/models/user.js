(function () {

    "use strict";

    var fs = require('fs');
    var path = require('path');
    var mongoose = require('mongoose');

    var User = function () {
        return {
            _schema: null,
            _model: null,

            Initialize: function () {
                console.log('user object initialization.');

                this._schema = mongoose.Schema();

                var userSchema = {
                    "username": {
                        "type": "string",
                        "unique": "true",
                        "required": "true"
                    },
                    "email": {
                        "type": "string",
                        "unique": "true",
                        "required": "true"
                    },
                    "authToken": {
                        "access_token": "string",
                        "refresh_token": "string",
                        "scope": "string",
                        "expires_in": "number",
                        "expire_in": "number"
                    }
                };

                this._schema.add(userSchema);
                this._model = mongoose.model('user', this._schema);

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
