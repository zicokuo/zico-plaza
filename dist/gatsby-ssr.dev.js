"use strict";

require('isomorphic-fetch');

var preferDefault = function preferDefault(m) {
  return m && m["default"] || m;
};

exports.wrapRootElement = preferDefault(require('./src/lib/inject-provider'));