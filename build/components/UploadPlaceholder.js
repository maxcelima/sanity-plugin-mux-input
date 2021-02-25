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

var _UploadPlaceholder = _interopRequireDefault(require("./UploadPlaceholder.css"));

var _uploadIcon = _interopRequireDefault(require("part:@sanity/base/upload-icon"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var UploadPlaceholder = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(UploadPlaceholder, _React$PureComponent);

  var _super = _createSuper(UploadPlaceholder);

  function UploadPlaceholder() {
    (0, _classCallCheck2["default"])(this, UploadPlaceholder);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(UploadPlaceholder, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          invalidPaste = _this$props.invalidPaste,
          invalidFile = _this$props.invalidFile,
          hasFocus = _this$props.hasFocus,
          isDraggingOver = _this$props.isDraggingOver;
      var fileClassNames = [_UploadPlaceholder["default"].dropFile];
      var pasteClassNames = [_UploadPlaceholder["default"].pasteFile];

      if (invalidFile) {
        fileClassNames.push(_UploadPlaceholder["default"].invalidFile);
      }

      if (isDraggingOver) {
        fileClassNames.push(_UploadPlaceholder["default"].isDraggingOver);
      }

      if (invalidPaste) {
        pasteClassNames.push(_UploadPlaceholder["default"].invalidPaste);
      }

      if (hasFocus) {
        pasteClassNames.push(_UploadPlaceholder["default"].hasFocus);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: _UploadPlaceholder["default"].inner
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: fileClassNames.join(' ')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _UploadPlaceholder["default"].iconContainer
      }, /*#__PURE__*/_react["default"].createElement(_uploadIcon["default"], null)), /*#__PURE__*/_react["default"].createElement("p", {
        className: _UploadPlaceholder["default"].strong
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Drop file ", invalidFile))), /*#__PURE__*/_react["default"].createElement("div", {
        className: pasteClassNames.join(' ')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _UploadPlaceholder["default"].iconContainer
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 40 40",
        height: "1em",
        width: "1em"
      }, invalidPaste && /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "currentColor",
        d: "M32.38 3.76H24.8a5.41 5.41 0 0 0-10.22 0H7a3.62 3.62 0 0 0-3.62 3.62v29A3.62 3.62 0 0 0 7 40h25.38A3.62 3.62 0 0 0 36 36.38v-29a3.62 3.62 0 0 0-3.62-3.62zm-12.69 0a1.81 1.81 0 1 1-1.81 1.81 1.81 1.81 0 0 1 1.81-1.81zm12.69 32.62H7v-29h3.62v5.44h18.13V7.38h3.63z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        fill: "currentColor",
        d: "M12.29 29.13h14.38v1.63H12.29zM12.29 18.04h4.02v1.42h-4.02zM22.84 18.04h4.02v1.42h-4.02z"
      })), !invalidPaste && /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "currentColor",
        d: "M32.49 3.62h-7.56a5.4 5.4 0 0 0-10.19 0H7.18a3.62 3.62 0 0 0-3.62 3.61v28.93a3.62 3.62 0 0 0 3.62 3.62h25.31a3.62 3.62 0 0 0 3.62-3.62V7.23a3.62 3.62 0 0 0-3.62-3.61zm-12.65 0A1.81 1.81 0 1 1 18 5.42a1.81 1.81 0 0 1 1.84-1.8zm12.65 32.54H7.18V7.23h3.61v5.43h18.09V7.23h3.61z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        fill: "currentColor",
        d: "M20 33.15c-6.26 0-8.44-4.22-8.53-4.4l1.73-.86-.87.43.87-.44c.07.14 1.78 3.34 6.8 3.34s6.73-3.2 6.8-3.34l1.72.87c-.09.18-2.27 4.4-8.52 4.4zM12.45 18.62h4.01v3.72h-4.01zM22.98 18.62h4.01v3.72h-4.01z"
      })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
        className: _UploadPlaceholder["default"].strong
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Paste URL"))))));
    }
  }]);
  return UploadPlaceholder;
}(_react["default"].PureComponent);

exports["default"] = UploadPlaceholder;
(0, _defineProperty2["default"])(UploadPlaceholder, "propTypes", {
  hasFocus: _propTypes["default"].bool,
  invalidPaste: _propTypes["default"].bool,
  invalidFile: _propTypes["default"].bool,
  isDraggingOver: _propTypes["default"].bool
});