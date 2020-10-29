"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [],
  purge: {
    mode: "all",
    content: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
    options: {
      whitelist: [""]
    }
  },
  theme: {
    extend: {
      colors: {
        "gold-100": "#fbab83",
        "gold-500": "#FA884F",
        "gold-900": "#EC7C48"
      },
      fontFamily: {
        arvo: ["Arvo"].concat(_toConsumableArray(defaultTheme.fontFamily.sans)),
        cabin: ["Cabin"].concat(_toConsumableArray(defaultTheme.fontFamily.sans))
      },
      maxHeight: {
        '0': '0',
        '25': '25%',
        '50': '50%',
        '75': '75%',
        'full': '100%'
      },
      height: {
        '128': ''
      }
    }
  },
  variants: {},
  future: {
    removeDeprecatedGapUtilities: true
  },
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true
  }
};