"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _secrets = require("../actions/secrets");

var _default2 = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _default3 = _interopRequireDefault(require("part:@sanity/components/fieldsets/default"));

var _default4 = _interopRequireDefault(require("part:@sanity/components/formfields/default"));

var _default5 = _interopRequireDefault(require("part:@sanity/components/textinputs/default"));

var _Setup = _interopRequireDefault(require("./Setup.css"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = {
  onSave: _propTypes["default"].func.isRequired,
  onCancel: _propTypes["default"].func.isRequired,
  secrets: _propTypes["default"].shape({
    token: _propTypes["default"].string,
    secretKey: _propTypes["default"].string
  })
};

var MuxVideoInputSetup = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(MuxVideoInputSetup, _Component);

  var _super = _createSuper(MuxVideoInputSetup);

  function MuxVideoInputSetup(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MuxVideoInputSetup);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "tokenInputId", (0, _lodash.uniqueId)('MuxTokenInput'));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "secretKeyInputId", (0, _lodash.uniqueId)('MuxSecretInput'));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      token: null,
      secretKey: null,
      isLoading: false,
      error: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleTokenChanged", function (event) {
      _this.setState({
        token: event.currentTarget.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSecretKeyChanged", function (event) {
      _this.setState({
        secretKey: event.currentTarget.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCancel", function (event) {
      _this.props.onCancel();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleOnSubmit", function (event) {
      event.preventDefault();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSaveToken", function () {
      var handleError = function handleError(err) {
        console.error(err); // eslint-disable-line no-console

        _this.setState({
          isLoading: false,
          error: 'Something went wrong saving the token. See console.error for more info.'
        });
      };

      _this.setState({
        isLoading: true
      });

      var token = _this.state.token || null;
      var secretKey = _this.state.secretKey || null;
      (0, _secrets.saveSecrets)(token, secretKey).then(function () {
        (0, _secrets.testSecrets)().then(function (result) {
          _this.setState({
            isLoading: false
          });

          if (result.status) {
            _this.props.onSave({
              token: token,
              secretKey: secretKey
            });

            return;
          }

          _this.setState({
            error: 'Invalid credentials'
          });
        })["catch"](handleError);
      })["catch"](handleError);
    });

    if (props.secrets) {
      var _props$secrets = props.secrets,
          token = _props$secrets.token,
          secretKey = _props$secrets.secretKey;
      _this.state.token = token;
      _this.state.secretKey = secretKey;
    }

    _this.firstField = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  (0, _createClass2["default"])(MuxVideoInputSetup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.firstField.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          error = _this$state.error,
          isLoading = _this$state.isLoading;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _Setup["default"].root
      }, /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: this.handleOnSubmit
      }, /*#__PURE__*/_react["default"].createElement(_default3["default"], {
        legend: 'MUX API Credentials',
        level: 1,
        description: "The credentials will be stored safely in a hidden document only available to editors."
      }, /*#__PURE__*/_react["default"].createElement(_default4["default"], {
        label: "Access Token",
        labelFor: this.tokenInputId,
        level: 0,
        className: _Setup["default"].formField
      }, /*#__PURE__*/_react["default"].createElement(_default5["default"], {
        id: this.tokenInputId,
        ref: this.firstField,
        onChange: this.handleTokenChanged,
        type: "text",
        value: this.state.token || ''
      })), /*#__PURE__*/_react["default"].createElement(_default4["default"], {
        label: "Secret Key",
        labelFor: this.secretKeyInputId,
        level: 0,
        className: _Setup["default"].formField
      }, /*#__PURE__*/_react["default"].createElement(_default5["default"], {
        id: this.secretKeyInputId,
        onChange: this.handleSecretKeyChanged,
        type: "text",
        value: this.state.secretKey || ''
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _Setup["default"].buttons
      }, /*#__PURE__*/_react["default"].createElement(_default2["default"], {
        loading: isLoading,
        color: "primary",
        kind: "default",
        onClick: this.handleSaveToken
      }, "Save"), /*#__PURE__*/_react["default"].createElement(_default2["default"], {
        color: "primary",
        kind: "simple",
        onClick: this.handleCancel
      }, "Cancel")), error && /*#__PURE__*/_react["default"].createElement("p", {
        className: _Setup["default"].error
      }, error)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _Setup["default"].notice
      }, /*#__PURE__*/_react["default"].createElement("p", null, "To set up a new access token, go to your", ' ', /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://dashboard.mux.com/settings/access-tokens",
        target: "_blank",
        rel: "noreferer noopener"
      }, "account on mux.com"), "."), /*#__PURE__*/_react["default"].createElement("p", null, "The access token needs permissions: ", /*#__PURE__*/_react["default"].createElement("strong", null, "Mux Video "), "(Full Access) and ", /*#__PURE__*/_react["default"].createElement("strong", null, "Mux Data"), " (Read)"))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, nextState) {
      if (!nextState.secrets) {
        return null;
      }

      if (nextProps.secrets) {
        return {
          token: nextProps.secrets.token,
          secretKey: nextProps.secrets.secretKey
        };
      }

      return null;
    }
  }]);
  return MuxVideoInputSetup;
}(_react.Component);

MuxVideoInputSetup.propTypes = propTypes;
var _default = MuxVideoInputSetup;
exports["default"] = _default;