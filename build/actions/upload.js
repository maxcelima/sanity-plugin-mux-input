"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelUpload = cancelUpload;
exports.uploadUrl = uploadUrl;
exports.uploadFile = uploadFile;
exports.getUpload = getUpload;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _uuid = _interopRequireDefault(require("uuid"));

var _lodash = require("lodash");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _upChunkObserable = require("../clients/upChunkObserable");

var _assets = require("../actions/assets");

var _secrets = require("../actions/secrets");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function cancelUpload(uuid) {
  return _client["default"].observable.request({
    url: "/addons/mux/uploads/".concat(_client["default"].clientConfig.dataset, "/").concat(uuid),
    withCredentials: true,
    method: 'DELETE'
  });
}

function uploadUrl(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return testUrl(url).pipe((0, _operators.switchMap)(function (validUrl) {
    return (0, _rxjs.concat)((0, _rxjs.of)({
      type: 'url',
      url: validUrl
    }), (0, _secrets.testSecretsObservable)().pipe((0, _operators.switchMap)(function (json) {
      if (!json || !json.status) {
        return (0, _rxjs.throwError)(new Error('Invalid credentials'));
      }

      var uuid = _uuid["default"].v4();

      var privacies = options.privacies;
      var muxBody = {
        input: validUrl,
        playback_policy: privacies || ['public'],
        mp4_support: 'standard'
      };
      var query = {
        muxBody: JSON.stringify(muxBody),
        filename: validUrl.split('/').slice(-1)[0]
      };
      var dataset = _client["default"].clientConfig.dataset;
      return (0, _rxjs.defer)(function () {
        return _client["default"].observable.request({
          url: "/addons/mux/assets/".concat(dataset),
          withCredentials: true,
          method: 'POST',
          headers: {
            'MUX-Proxy-UUID': uuid,
            'Content-Type': 'application/json'
          },
          query: query
        });
      }).pipe((0, _operators.mergeMap)(function (result) {
        var asset = result && result.results && result.results[0] && result.results[0].document || null;

        if (!asset) {
          return (0, _rxjs.throwError)(new Error('No asset document returned'));
        }

        return (0, _rxjs.of)({
          type: 'success',
          id: uuid,
          asset: asset
        });
      }));
    })));
  }));
}

function uploadFile(file) {
  return testFile(file).pipe((0, _operators.switchMap)(function (fileOptions) {
    return (0, _rxjs.concat)((0, _rxjs.of)({
      type: 'file',
      file: fileOptions
    }), (0, _secrets.testSecretsObservable)().pipe((0, _operators.switchMap)(function (json) {
      if (!json || !json.status) {
        return (0, _rxjs.throwError)(new Error('Invalid credentials'));
      }

      var uuid = _uuid["default"].v4();

      return (0, _rxjs.concat)((0, _rxjs.of)({
        type: 'uuid',
        uuid: uuid
      }), (0, _rxjs.defer)(function () {
        return _client["default"].observable.request({
          url: "/addons/mux/uploads/".concat(_client["default"].clientConfig.dataset),
          withCredentials: true,
          method: 'POST',
          headers: {
            'MUX-Proxy-UUID': uuid,
            'Content-Type': 'application/json'
          }
        });
      }).pipe((0, _operators.mergeMap)(function (result) {
        return (0, _upChunkObserable.createUpChunkObservable)(uuid, result.upload.url, file).pipe( // eslint-disable-next-line max-nested-callbacks
        (0, _operators.mergeMap)(function (event) {
          if (event.type !== 'success') {
            return (0, _rxjs.of)(event);
          }

          return (0, _rxjs.from)(updateAssetDocumentFromUpload(uuid)).pipe( // eslint-disable-next-line max-nested-callbacks
          (0, _operators.mergeMap)(function (doc) {
            return (0, _rxjs.of)(_objectSpread(_objectSpread({}, event), {}, {
              asset: doc
            }));
          }));
        }), // eslint-disable-next-line max-nested-callbacks
        (0, _operators.catchError)(function (err) {
          // Delete asset document
          return cancelUpload(uuid).pipe((0, _operators.mergeMapTo)((0, _rxjs.throwError)(err)));
        }));
      })));
    })));
  }));
}

function getUpload(assetId) {
  return _client["default"].request({
    url: "/addons/mux/uploads/".concat(_client["default"].clientConfig.dataset, "/").concat(assetId),
    withCredentials: true,
    method: 'GET'
  });
}

var _default = {
  uploadUrl: uploadUrl,
  uploadFile: uploadFile,
  getUpload: getUpload
};
exports["default"] = _default;

function pollUpload(uuid) {
  var maxTries = 10;
  var pollInterval;
  var tries = 0;
  var assetId;
  var upload;
  return new Promise(function (resolve, reject) {
    pollInterval = setInterval( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return getUpload(uuid);

            case 3:
              upload = _context.sent;
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
              return _context.abrupt("return");

            case 10:
              assetId = upload && upload.data && upload.data.asset_id;

              if (assetId) {
                clearInterval(pollInterval);
                resolve(upload);
              }

              if (tries > maxTries) {
                clearInterval(pollInterval);
                reject(new Error('Upload did not finish'));
              }

              tries++;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    })), 2000);
  });
}

function updateAssetDocumentFromUpload(_x) {
  return _updateAssetDocumentFromUpload.apply(this, arguments);
}

function _updateAssetDocumentFromUpload() {
  _updateAssetDocumentFromUpload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(uuid) {
    var upload, asset, doc;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return pollUpload(uuid);

          case 3:
            upload = _context2.sent;
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", Promise.reject(_context2.t0));

          case 9:
            _context2.prev = 9;
            _context2.next = 12;
            return (0, _assets.getAsset)(upload.data.asset_id);

          case 12:
            asset = _context2.sent;
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t1 = _context2["catch"](9);
            return _context2.abrupt("return", Promise.reject(_context2.t1));

          case 18:
            doc = {
              _id: uuid,
              _type: 'mux.videoAsset',
              status: asset.data.status,
              data: asset.data,
              assetId: asset.data.id,
              playbackId: asset.data.playback_ids[0].id,
              uploadId: upload.data.id
            };
            return _context2.abrupt("return", _client["default"].createOrReplace(doc).then(function () {
              return doc;
            }));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6], [9, 15]]);
  }));
  return _updateAssetDocumentFromUpload.apply(this, arguments);
}

function testFile(file) {
  if (typeof window !== 'undefined' && file instanceof window.File) {
    var fileOptions = optionsFromFile(file);
    return (0, _rxjs.of)(fileOptions);
  }

  return (0, _rxjs.throwError)(new Error('Invalid file'));
}

function testUrl(url) {
  var error = new Error('Invalid URL');

  if (!(0, _lodash.isString)(url)) {
    return (0, _rxjs.throwError)(error);
  }

  var parsed;

  try {
    parsed = new URL(url);
  } catch (err) {
    return (0, _rxjs.throwError)(error);
  }

  if (parsed && !parsed.protocol.match(/http:|https:/)) {
    return (0, _rxjs.throwError)(error);
  }

  return (0, _rxjs.of)(url);
}

function optionsFromFile(opts, file) {
  if (typeof window === 'undefined' || !(file instanceof window.File)) {
    return opts;
  }

  var fileOpts = {
    filename: opts.preserveFilename === false ? undefined : file.name,
    contentType: file.type
  };
  return _objectSpread(_objectSpread({}, {
    filename: opts.preserveFilename === false ? undefined : file.name,
    contentType: file.type
  }), {}, {
    fileOpts: fileOpts
  });
}