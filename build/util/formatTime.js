"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(duration) {
  {
    var secNum = parseInt(duration, 10);
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - hours * 3600) / 60);
    var seconds = secNum - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0".concat(hours);
    }

    if (minutes < 10) {
      minutes = "0".concat(minutes);
    }

    if (seconds < 10) {
      seconds = "0".concat(seconds);
    }

    return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
  }
};

exports["default"] = _default;