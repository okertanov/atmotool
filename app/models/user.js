(function () {

    "use strict";

    var fs = require('fs');
    var path = require('path');
    var mongoose = require('mongoose');

    var User = function () {

        console.log('User object initialization.');

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

        var schema = mongoose.Schema();
        schema.add(userSchema);

        var model = mongoose.model('user', schema);

        return {
            _schema: schema,
            _model: model,
            _userSchema: userSchema,

            Schema: function () {
                return this._schema;
            },
            Model: function () {
                return this._model;
            },
            Instance: function (obj) {
                return this._model(obj);
            }
        };
    };

    module.exports = User;

})();
