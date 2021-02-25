"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rxjs = require("rxjs");

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _getIt = _interopRequireDefault(require("get-it"));

var _base = _interopRequireDefault(require("get-it/lib/middleware/base"));

var _observable = _interopRequireDefault(require("get-it/lib/middleware/observable"));

var _jsonResponse = _interopRequireDefault(require("get-it/lib/middleware/jsonResponse"));

var _middleware = require("get-it/lib/middleware");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var baseUrl = _client["default"].clientConfig.url;
var request = (0, _getIt["default"])([(0, _base["default"])(baseUrl), (0, _middleware.progress)(), (0, _jsonResponse["default"])()]);
request.use((0, _observable["default"])({
  implementation: _rxjs.Observable
}));
var _default = {
  request: request,
  clientConfig: _objectSpread(_objectSpread({}, _client["default"].clientConfig), {}, {
    url: baseUrl
  })
};
exports["default"] = _default;