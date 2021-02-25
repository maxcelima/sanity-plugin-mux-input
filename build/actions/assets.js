"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAsset = deleteAsset;
exports.getAsset = getAsset;
exports["default"] = void 0;

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

/* eslint-disable camelcase */
function deleteAsset(assetId) {
  var dataset = _client["default"].clientConfig.dataset;
  return _client["default"].request({
    url: "/addons/mux/assets/".concat(dataset, "/").concat(assetId),
    withCredentials: true,
    method: 'DELETE'
  });
}

function getAsset(assetId) {
  var dataset = _client["default"].clientConfig.dataset;
  return _client["default"].request({
    url: "/addons/mux/assets/".concat(dataset, "/data/").concat(assetId),
    withCredentials: true,
    method: 'GET'
  });
}

var _default = {
  getAsset: getAsset,
  deleteAsset: deleteAsset
};
exports["default"] = _default;