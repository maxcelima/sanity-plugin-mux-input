"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _default2 = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _formBuilder = require("part:@sanity/form-builder");

var _secrets = require("../actions/secrets");

var _assets = require("../actions/assets");

var _getPosterSrc = _interopRequireDefault(require("../util/getPosterSrc"));

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _preview = require("part:@sanity/base/preview");

var _default3 = _interopRequireDefault(require("part:@sanity/components/dialogs/default"));

var _fullscreen = _interopRequireDefault(require("part:@sanity/components/dialogs/fullscreen"));

var _content = _interopRequireDefault(require("part:@sanity/components/dialogs/content"));

var _patchEvent = _interopRequireWildcard(require("part:@sanity/form-builder/patch-event"));

var _checkbox = _interopRequireDefault(require("part:@sanity/components/toggles/checkbox"));

var _default4 = _interopRequireDefault(require("part:@sanity/components/formfields/default"));

var _popover = _interopRequireDefault(require("part:@sanity/components/dialogs/popover"));

var _pluginIcon = _interopRequireDefault(require("part:@sanity/base/plugin-icon"));

var _spinner = _interopRequireDefault(require("part:@sanity/components/loading/spinner"));

var _Setup = _interopRequireDefault(require("./Setup"));

var _Video = _interopRequireDefault(require("./Video"));

var _SelectAsset = _interopRequireDefault(require("./SelectAsset"));

var _MuxLogo = _interopRequireDefault(require("./MuxLogo"));

var _Uploader = _interopRequireDefault(require("./Uploader"));

var _Input = _interopRequireDefault(require("./Input.css"));

var _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var NOOP = function NOOP() {};

var cachedSecrets = {
  token: null,
  secretKey: null
};

function validateSecrets(secrets) {
  return Object.keys(secrets).some(function (key) {
    return secrets[key] === null;
  });
}

function getSecrets() {
  var _this = this;

  if (cachedSecrets.token) {
    return Promise.resolve({
      isInitialSetup: true,
      needsSetup: false,
      secrets: cachedSecrets
    });
  }

  return (0, _secrets.fetchSecrets)().then(function (_ref) {
    var secrets = _ref.secrets,
        exists = _ref.exists;
    cachedSecrets.token = secrets.token;
    cachedSecrets.secretKey = secrets.secretKey;
    return {
      isInitialSetup: !exists,
      needsSetup: validateSecrets(cachedSecrets),
      secrets: cachedSecrets
    };
  })["catch"](function (error) {
    _this.setState({
      error: error
    });
  });
}

var _default = (0, _formBuilder.withDocument)((_temp = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(MuxVideoInput, _Component);

  var _super = _createSuper(MuxVideoInput);

  function MuxVideoInput(_props) {
    var _this2;

    (0, _classCallCheck2["default"])(this, MuxVideoInput);
    _this2 = _super.call(this, _props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "state", {
      assetDocument: null,
      confirmRemove: false,
      deleteOnMuxChecked: true,
      deleteAssetDocumentChecked: true,
      error: null,
      hasFocus: false,
      isInitialSetup: true,
      isLoading: 'secrets',
      needsSetup: true,
      secrets: null,
      showNewUpload: false,
      showSetup: false,
      showBrowser: false,
      videoReadyToPlay: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "focus", function () {
      _this2.setState({
        hasFocus: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "blur", function () {
      _this2.setState({
        hasFocus: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "pollMux", function () {
      var assetDocument = _this2.state.assetDocument;

      if (!assetDocument) {
        return;
      }

      if (_this2.pollInterval) {
        return;
      }

      _this2.pollInterval = setInterval(function () {
        (0, _assets.getAsset)(assetDocument.assetId).then(function (response) {
          var props = response.data;

          _client["default"].patch(assetDocument._id).set({
            status: props.status,
            data: props
          }).commit({
            returnDocuments: false
          });
        })["catch"](function (error) {
          _this2.setState({
            error: error
          });
        });
      }, 2000);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleSetupButtonClicked", function (event) {
      _this2.setState({
        showSetup: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleSaveSetup", function (_ref2) {
      var token = _ref2.token,
          secretKey = _ref2.secretKey;
      cachedSecrets.token = token;
      cachedSecrets.secretKey = secretKey;

      _this2.setState({
        showSetup: false,
        secrets: cachedSecrets,
        needsSetup: validateSecrets(cachedSecrets)
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleCancelSaveSetup", function () {
      _this2.setState({
        showSetup: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleOnUploadComplete", function (result) {
      var onChange = _this2.props.onChange;
      var _id = result._id;
      onChange(_patchEvent["default"].from([(0, _patchEvent.setIfMissing)({
        asset: {
          _ref: _id
        }
      }, []), (0, _patchEvent.set)({
        _ref: _id
      }, ['asset'])]));

      _this2.setState({
        showNewUpload: false,
        assetDocument: result.document
      }, function () {
        _this2.setupAssetListener();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleRemoveVideoButtonClicked", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this2.setState({
        confirmRemove: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleRemoveVideo", function () {
      var assetDocument = _this2.state.assetDocument;

      _this2.setState({
        isLoading: true
      });

      var unsetAsset = function unsetAsset() {
        return new Promise(function (resolve, reject) {
          _this2.setState({
            assetDocument: null,
            confirmRemove: false,
            isLoading: false
          }, function () {
            if (_this2.state.deleteOnMuxChecked || _this2.state.deleteAssetDocumentChecked) {
              return _client["default"].patch(_this2.props.document._id).unset(['video']).commit({
                returnDocuments: false
              }).then(function () {
                if (!assetDocument) {
                  return resolve();
                }

                return _client["default"]["delete"](assetDocument._id).then(function () {
                  resolve();
                })["catch"](function (error) {
                  reject(error);
                });
              });
            }

            return resolve();
          });
        });
      };

      return unsetAsset().then(function () {
        if (_this2.state.deleteOnMuxChecked) {
          return (0, _assets.deleteAsset)(assetDocument.assetId)["catch"](function (error) {
            _this2.setState({
              error: error
            });
          });
        }

        return true;
      })["catch"](function (error) {
        _this2.setState({
          error: error
        });
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleCancelRemove", function (event) {
      _this2.setState({
        confirmRemove: false,
        deleteOnMuxChecked: true,
        deleteAssetDocumentChecked: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleDeleteOnMuxCheckBoxClicked", function (event) {
      _this2.setState(function (prevState) {
        return {
          deleteOnMuxChecked: !prevState.deleteOnMuxChecked
        };
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleDeleteAssetDocumentCheckBoxClicked", function (event) {
      _this2.setState(function (prevState) {
        return {
          deleteAssetDocumentChecked: !prevState.deleteAssetDocumentChecked
        };
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleSetThumbButton", function (event) {
      if (!_this2.videoPlayer.current) {
        return;
      }

      var assetDocument = _this2.state.assetDocument;

      var currentTime = _this2.videoPlayer.current.getVideoElement().currentTime;

      _client["default"].patch(assetDocument._id).set({
        thumbTime: currentTime
      }).commit({
        returnDocuments: false
      }).then(function (response) {
        _this2.setState({
          thumb: (0, _getPosterSrc["default"])(assetDocument.playbackId, {
            time: currentTime,
            width: 320,
            height: 320,
            fitMode: 'crop'
          })
        });
      })["catch"](function (error) {
        _this2.setState({
          error: error
        });
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleErrorClose", function (event) {
      if (event) {
        event.preventDefault();
      }

      _this2.setState({
        error: null
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleCloseThumbPreview", function (event) {
      _this2.setState({
        thumb: null
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleBrowseButton", function (event) {
      _this2.setState({
        showBrowser: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleCloseBrowser", function (event) {
      _this2.setState({
        showBrowser: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleSelectAsset", function (asset) {
      var onChange = _this2.props.onChange;
      onChange(_patchEvent["default"].from([(0, _patchEvent.setIfMissing)({
        asset: {
          _ref: asset._id
        }
      }, []), (0, _patchEvent.set)({
        _ref: asset._id
      }, ['asset'])]));

      _this2.setState({
        showBrowser: false,
        assetDocument: asset
      }, function () {
        _this2.setupAssetListener();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "handleVideoReadyToPlay", function () {
      _this2.setState({
        videoReadyToPlay: true
      });
    });
    getSecrets().then(function (_ref3) {
      var secrets = _ref3.secrets,
          isInitialSetup = _ref3.isInitialSetup,
          needsSetup = _ref3.needsSetup;

      _this2.setState({
        secrets: secrets,
        isInitialSetup: isInitialSetup,
        needsSetup: needsSetup,
        isLoading: _props.value && _props.value.asset // If there is an asset continue loading

      });
    });
    _this2.setupButton = /*#__PURE__*/_react["default"].createRef();
    _this2.pollInterval = null;
    _this2.video = /*#__PURE__*/_react["default"].createRef();
    _this2.removeVideoButton = /*#__PURE__*/_react["default"].createRef();
    _this2.videoPlayer = /*#__PURE__*/_react["default"].createRef();
    return _this2;
  }

  (0, _createClass2["default"])(MuxVideoInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setupAssetListener();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      if (this.pollInterval) {
        clearInterval(this.pollInterval);
        this.pollInterval = null;
      }
    }
  }, {
    key: "getAsset",
    value: function getAsset() {
      var value = this.props.value;
      return value ? value.asset : null;
    }
  }, {
    key: "setupAssetListener",
    value: function setupAssetListener() {
      var _this3 = this;

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.setState({
        videoReadyToPlay: false
      });
      var asset = this.getAsset();

      if (!asset) {
        return;
      }

      this.subscription = (0, _preview.observePaths)(asset, ['thumbTime', 'data', 'assetId', 'playbackId', 'status']).pipe((0, _operators.tap)(function (assetDocument) {
        _this3.setState({
          assetDocument: assetDocument
        });

        if (assetDocument && assetDocument.status === 'errored') {
          clearInterval(_this3.pollInterval);
          _this3.pollInterval = null; // todo: use client.observable

          return _this3.handleRemoveVideo().then(function () {
            _this3.setState({
              isLoading: false,
              error: new Error(assetDocument.data.errors.messages.join(' '))
            });
          });
        }

        if (assetDocument && assetDocument.status === 'preparing') {
          _this3.pollMux();
        }

        if (assetDocument && assetDocument.status === 'ready') {
          clearInterval(_this3.pollInterval);
          _this3.pollInterval = null;
        }

        _this3.setState({
          assetDocument: assetDocument,
          isLoading: false
        });

        return (0, _rxjs.of)(assetDocument);
      })).subscribe();
    }
  }, {
    key: "renderSetup",
    value: function renderSetup() {
      var secrets = this.state.secrets;

      var setup = /*#__PURE__*/_react["default"].createElement(_Setup["default"], {
        secrets: secrets ? secrets : null,
        onSave: this.handleSaveSetup,
        onCancel: this.handleCancelSaveSetup
      });

      return /*#__PURE__*/_react["default"].createElement(_popover["default"], {
        color: "default",
        useOverlay: true,
        onEscape: this.handleCancelSaveSetup,
        onClickOutside: this.handleCancelSaveSetup,
        padding: "large"
      }, setup);
    }
  }, {
    key: "renderSetupButton",
    value: function renderSetupButton() {
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          showSetup = _this$state.showSetup,
          needsSetup = _this$state.needsSetup;
      var renderSetup = !isLoading && showSetup;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _Input["default"].setupButtonContainer
      }, /*#__PURE__*/_react["default"].createElement(_default2["default"], {
        color: needsSetup ? 'danger' : 'primary',
        onClick: this.handleSetupButtonClicked,
        icon: _pluginIcon["default"],
        kind: "simple",
        title: "Configure MUX API access",
        tabIndex: 1
      }), renderSetup && this.renderSetup());
    }
  }, {
    key: "renderSetupNotice",
    value: function renderSetupNotice() {
      var _this$state2 = this.state,
          isLoading = _this$state2.isLoading,
          needsSetup = _this$state2.needsSetup,
          isInitialSetup = _this$state2.isInitialSetup;
      var renderSetupNotice = needsSetup;

      if (isLoading || !renderSetupNotice) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _Input["default"].warning
      }, /*#__PURE__*/_react["default"].createElement(_MuxLogo["default"], null), isInitialSetup && /*#__PURE__*/_react["default"].createElement("p", null, "Looks like this is the first time you are using the MUX video plugin in this dataset. Great!"), /*#__PURE__*/_react["default"].createElement("p", null, "Before you can upload video, you must set your MUX credentials."), /*#__PURE__*/_react["default"].createElement("p", null, "Click the plugin button in the field title to open Setup."));
    } // eslint-disable-next-line complexity

  }, {
    key: "renderAsset",
    value: function renderAsset() {
      var assetDocument = this.state.assetDocument;
      var renderAsset = !!assetDocument;

      if (!renderAsset) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_Video["default"], {
        assetDocument: assetDocument,
        ref: this.videoPlayer,
        onReady: this.handleVideoReadyToPlay,
        onCancel: this.handleRemoveVideo
      });
    }
  }, {
    key: "renderVideoButtons",
    value: function renderVideoButtons() {
      var _this$state3 = this.state,
          assetDocument = _this$state3.assetDocument,
          confirmRemove = _this$state3.confirmRemove;
      var readOnly = this.props.readOnly;

      if (assetDocument && assetDocument.status === 'ready' && !readOnly) {
        return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(_default2["default"], {
          inverted: true,
          kind: "default",
          onClick: this.handleBrowseButton,
          title: "Select a previous uploaded video"
        }, "Browse"), /*#__PURE__*/_react["default"].createElement(_default2["default"], {
          inverted: true,
          disabled: this.state.videoReadyToPlay === false,
          kind: "default",
          onClick: this.handleSetThumbButton,
          title: "Set thumbnail image from the current video position"
        }, "Set thumb"), /*#__PURE__*/_react["default"].createElement(_default2["default"], {
          ref: this.removeVideoButton,
          inverted: true,
          kind: "default",
          color: "danger",
          onClick: confirmRemove ? NOOP : this.handleRemoveVideoButtonClicked
        }, "Remove", /*#__PURE__*/_react["default"].createElement("div", {
          className: _Input["default"].popoverAnchor
        }, confirmRemove && /*#__PURE__*/_react["default"].createElement(_popover["default"], {
          color: "default",
          useOverlay: true,
          onEscape: this.handleCancelRemove,
          onClickOutside: this.handleCancelRemove,
          padding: "large"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _Input["default"].confirmDeletePopover
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _Input["default"].confirmDeletePopoverButtons
        }, /*#__PURE__*/_react["default"].createElement(_default2["default"], {
          onClick: this.handleCancelRemove
        }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_default2["default"], {
          color: "danger",
          onClick: this.handleRemoveVideo,
          loading: !!this.state.isLoading
        }, "Remove")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
          checked: this.state.deleteOnMuxChecked,
          onChange: this.handleDeleteOnMuxCheckBoxClicked
        }, "Delete asset on MUX.com"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
          disabled: this.state.deleteOnMuxChecked,
          checked: this.state.deleteOnMuxChecked || this.state.deleteAssetDocumentChecked,
          onChange: this.handleDeleteAssetDocumentCheckBoxClicked
        }, "Delete video from dataset"))))));
      }

      return null;
    }
  }, {
    key: "renderThumbPreview",
    value: function renderThumbPreview() {
      return /*#__PURE__*/_react["default"].createElement(_popover["default"], {
        color: "default",
        useOverlay: true,
        onClose: this.handleCloseThumbPreview,
        onEscape: this.handleCloseThumbPreview,
        onClickOutside: this.handleCloseThumbPreview,
        padding: "large"
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, "Saved thumbnail frame:"), /*#__PURE__*/_react["default"].createElement("img", {
        className: _Input["default"].thumbPreview,
        src: this.state.thumb,
        width: 240,
        height: 240
      })));
    }
  }, {
    key: "renderBrowser",
    value: function renderBrowser() {
      return /*#__PURE__*/_react["default"].createElement(_fullscreen["default"], {
        title: "Select video",
        onClose: this.handleCloseBrowser,
        isOpen: true
      }, /*#__PURE__*/_react["default"].createElement(_SelectAsset["default"], {
        onSelect: this.handleSelectAsset
      }));
    }
  }, {
    key: "renderError",
    value: function renderError() {
      var error = this.state.error;

      if (!error) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_default3["default"], {
        title: "Error",
        color: "danger",
        useOverlay: true,
        onClose: this.handleErrorClose,
        onEscape: this.handleErrorClose,
        onClickOutside: this.handleErrorClose
      }, /*#__PURE__*/_react["default"].createElement(_content["default"], {
        size: "small"
      }, error.message));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          level = _this$props.level,
          markers = _this$props.markers;
      var _this$state4 = this.state,
          isLoading = _this$state4.isLoading,
          secrets = _this$state4.secrets,
          hasFocus = _this$state4.hasFocus,
          needsSetup = _this$state4.needsSetup,
          error = _this$state4.error,
          thumb = _this$state4.thumb,
          showBrowser = _this$state4.showBrowser;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _Input["default"].root
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _Input["default"].header
      }, /*#__PURE__*/_react["default"].createElement(_default4["default"], {
        label: type.title,
        markers: markers,
        description: type.description,
        level: level,
        className: _Input["default"].formField
      }), this.renderSetupButton()), isLoading === 'secrets' && /*#__PURE__*/_react["default"].createElement("div", {
        className: _Input["default"].isLoading
      }, /*#__PURE__*/_react["default"].createElement(_spinner["default"], {
        inline: true
      }), /*#__PURE__*/_react["default"].createElement("span", null, "Fetching credentials")), this.renderSetupNotice(), !needsSetup && /*#__PURE__*/_react["default"].createElement(_Uploader["default"], {
        buttons: this.renderVideoButtons(),
        hasFocus: hasFocus,
        onBlur: this.blur,
        onFocus: this.focus,
        onSetupButtonClicked: this.handleSetupButtonClicked,
        onUploadComplete: this.handleOnUploadComplete,
        secrets: secrets,
        onBrowse: this.handleBrowseButton
      }, this.renderAsset()), thumb && this.renderThumbPreview(), showBrowser && this.renderBrowser(), error && this.renderError());
    }
  }]);
  return MuxVideoInput;
}(_react.Component), _temp));

exports["default"] = _default;