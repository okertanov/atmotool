"use strict";

var nconf = require('nconf');
var path = require('path');

function Config(name) {
  return nconf
      .argv()
      .env()
      .file({file: path.join(__dirname, 'config.json')})
      .get(name);
}

module.exports = Config;


