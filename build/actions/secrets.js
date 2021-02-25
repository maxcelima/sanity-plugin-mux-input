"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSecrets = fetchSecrets;
exports.saveSecrets = saveSecrets;
exports.testSecrets = testSecrets;
exports.testSecretsObservable = testSecretsObservable;

var _rxjs = require("rxjs");

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

function fetchSecrets() {
  return _client["default"].fetch('*[_id == "secrets.mux"]').then(function (results) {
    var secrets = {
      token: null,
      secretKey: null
    };

    if (results.length > 0) {
      secrets.token = results[0].token || null;
      secrets.secretKey = results[0].secretKey || null;
    }

    var exists = results.length !== 0;
    return {
      secrets: secrets,
      exists: exists
    };
  });
}

function saveSecrets(token, secretKey) {
  var doc = {
    _id: 'secrets.mux',
    _type: 'mux.apiKey',
    token: token,
    secretKey: secretKey
  };
  return _client["default"].createOrReplace(doc).then(function (res) {
    return {
      token: token,
      secretKey: secretKey
    };
  });
}

function testSecrets() {
  var dataset = _client["default"].clientConfig.dataset;
  return _client["default"].request({
    url: "/addons/mux/secrets/".concat(dataset, "/test"),
    withCredentials: true,
    method: 'GET'
  });
}

function testSecretsObservable() {
  var dataset = _client["default"].clientConfig.dataset;
  return (0, _rxjs.defer)(function () {
    return _client["default"].observable.request({
      url: "/addons/mux/secrets/".concat(dataset, "/test"),
      withCredentials: true,
      method: 'GET'
    });
  });
}