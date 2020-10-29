"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRootElement = void 0;

require("typeface-montserrat");

require("typeface-merriweather");

require("./src/normalize.css");

require("./src/style.css");

require("prismjs/themes/prism.css");

var _injectProvider = _interopRequireDefault(require("./src/lib/inject-provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// custom typefaces
// normalize CSS across browsers
// custom CSS styles
// Highlighting for code blocks
var preferDefault = function preferDefault(m) {
  return m && m["default"] || m;
};

var wrapRootElement = preferDefault(_injectProvider["default"]);
exports.wrapRootElement = wrapRootElement;