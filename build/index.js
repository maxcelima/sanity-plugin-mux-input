"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Input = _interopRequireDefault(require("./components/Input"));

var _Preview = _interopRequireDefault(require("./components/Preview"));

var _Video = _interopRequireDefault(require("./components/Video"));

var _default = {
  Input: _Input["default"],
  Preview: _Preview["default"],
  Player: _Video["default"]
};
exports["default"] = _default;