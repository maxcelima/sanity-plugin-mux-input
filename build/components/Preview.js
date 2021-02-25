"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _preview = require("part:@sanity/base/preview");

var _Video = _interopRequireDefault(require("./Video"));

var _Preview = _interopRequireDefault(require("./Preview.css"));

var _formatTime = _interopRequireDefault(require("../util/formatTime"));

var _getPosterSrc = _interopRequireDefault(require("../util/getPosterSrc"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var MuxVideoPreview = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MuxVideoPreview, _React$Component);

  var _super = _createSuper(MuxVideoPreview);

  function MuxVideoPreview() {
    (0, _classCallCheck2["default"])(this, MuxVideoPreview);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(MuxVideoPreview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          layout = _this$props.layout;

      if (!value) {
        return null;
      }

      if (layout === 'block') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _Preview["default"].root
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _Preview["default"].video
        }, /*#__PURE__*/_react["default"].createElement(_Video["default"], {
          assetDocument: value,
          autoload: false
        })));
      }

      var playbackId = value.playbackId,
          status = value.status,
          duration = value.duration,
          filename = value.filename,
          thumbTime = value.thumbTime;
      var posterUrl;

      if (status === 'ready') {
        posterUrl = (0, _getPosterSrc["default"])(playbackId, {
          time: thumbTime,
          fitMode: 'crop',
          width: 60,
          height: 60
        });
      }

      var media = posterUrl ? /*#__PURE__*/_react["default"].createElement("img", {
        src: posterUrl
      }) : null;
      return /*#__PURE__*/_react["default"].createElement(_preview.SanityDefaultPreview, {
        media: media,
        title: filename || playbackId,
        subtitle: duration ? "Duration: ".concat((0, _formatTime["default"])(duration)) : null
      });
    }
  }]);
  return MuxVideoPreview;
}(_react["default"].Component);

exports["default"] = MuxVideoPreview;
(0, _defineProperty2["default"])(MuxVideoPreview, "propTypes", {
  value: _propTypes["default"].object
});