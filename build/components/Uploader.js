"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _extractFiles = require("../util/extractFiles");

var _upload = require("../actions/upload");

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _default2 = _interopRequireDefault(require("part:@sanity/components/formfields/default"));

var _button = _interopRequireDefault(require("part:@sanity/components/fileinput/button"));

var _buttonCollection = _interopRequireDefault(require("part:@sanity/components/buttons/button-collection"));

var _default3 = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _default4 = _interopRequireDefault(require("part:@sanity/components/dialogs/default"));

var _content = _interopRequireDefault(require("part:@sanity/components/dialogs/content"));

var _bar = _interopRequireDefault(require("part:@sanity/components/progress/bar"));

var _UploadPlaceholder = _interopRequireDefault(require("./UploadPlaceholder"));

var _uploadIcon = _interopRequireDefault(require("part:@sanity/base/upload-icon"));

var _Uploader = _interopRequireDefault(require("./Uploader.css"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ctrlKey = 17;
var cmdKey = 91;
var propTypes = {
  hasFocus: _propTypes["default"].bool,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onBrowse: _propTypes["default"].func.isRequired,
  onSetupButtonClicked: _propTypes["default"].func.isRequired,
  onUploadComplete: _propTypes["default"].func,
  secrets: _propTypes["default"].shape({
    token: _propTypes["default"].string,
    secretKey: _propTypes["default"].string
  }),
  buttons: _propTypes["default"].node,
  children: _propTypes["default"].node
};

function createEventHandler() {
  var events$ = new _rxjs.Subject();

  var handler = function handler(event) {
    return events$.next(event);
  };

  return [events$.asObservable(), handler];
}

var MuxVideoInputUploader = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(MuxVideoInputUploader, _Component);

  var _super = _createSuper(MuxVideoInputUploader);

  function MuxVideoInputUploader() {
    var _this;

    (0, _classCallCheck2["default"])(this, MuxVideoInputUploader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isDraggingOver: false,
      invalidPaste: false,
      invalidFile: false,
      uploadProgress: null,
      fileInfo: null,
      uuid: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dragEnteredEls", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "upload", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ctrlDown", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cancelUploadButton", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hiddenTextField", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "container", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleProgress", function (evt) {
      if (evt.percent) {
        _this.setState({
          uploadProgress: evt.percent
        });
      }

      if (evt.file) {
        _this.setState({
          fileInfo: evt.file
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleUploadFile", function (file) {
      _this.setState({
        uploadProgress: 0,
        fileInfo: null,
        uuid: null
      });

      _this.upload = (0, _upload.uploadFile)(file).pipe((0, _operators.takeUntil)(_this.onCancelUploadButtonClick$.pipe((0, _operators.tap)(function () {
        if (_this.state.uuid) {
          _client["default"]["delete"](_this.state.uuid);
        }
      })))).subscribe({
        complete: function complete() {
          _this.setState({
            error: null,
            uploadProgress: null,
            uuid: null
          });
        },
        next: function next(event) {
          _this.handleUploadEvent(event);
        },
        error: function error(err) {
          _this.setState({
            error: err,
            uploadProgress: null,
            uuid: null
          });
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleUploadEvent", function (event) {
      switch (event.type) {
        case 'success':
          return _this.handleUploadSuccess(event.asset);

        case 'progress':
          return _this.handleProgress(event);

        case 'file':
          return _this.setState({
            fileInfo: event.file
          });

        case 'uuid':
          // Means we created a mux.videoAsset document with an uuid
          return _this.setState({
            uuid: event.uuid
          });

        case 'url':
          return _this.setState({
            url: event.url,
            uploadProgress: 100
          });

        default:
          return null;
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleUploadSuccess", function (assetDocument) {
      _this.setState({
        uploadProgress: 100
      });

      if (_this.props.onUploadComplete) {
        _this.props.onUploadComplete(assetDocument);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePaste", function (event) {
      var clipboardData = event.clipboardData || window.clipboardData;
      var url = clipboardData.getData('text');
      _this.upload = (0, _upload.uploadUrl)(url, url.split('/').slice(-1)[0]).subscribe({
        complete: function complete() {
          _this.setState({
            error: null,
            uploadProgress: null,
            url: null
          });
        },
        next: function next(sEvent) {
          _this.handleUploadEvent(sEvent);
        },
        error: function error(err) {
          var error; // Don't output error dialog when just invalid url

          if (!err.message.toLowerCase().match('invalid url')) {
            error = err;
          }

          _this.setState({
            invalidPaste: true,
            error: error
          }, function () {
            setTimeout(function () {
              _this.setState({
                invalidPaste: false,
                uploadProgress: null
              });
            }, 2000);
          });
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDrop", function (event) {
      _this.setState({
        isDraggingOver: false
      });

      event.preventDefault();
      event.stopPropagation();
      (0, _extractFiles.extractDroppedFiles)(event.nativeEvent.dataTransfer).then(function (files) {
        if (files) {
          _this.handleUploadFile(files[0]);
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDragOver", function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDragEnter", function (event) {
      event.stopPropagation();

      _this.dragEnteredEls.push(event.target);

      _this.setState({
        isDraggingOver: true,
        hasFocus: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDragLeave", function (event) {
      event.stopPropagation();

      var idx = _this.dragEnteredEls.indexOf(event.target);

      if (idx > -1) {
        _this.dragEnteredEls.splice(idx, 1);
      }

      if (_this.dragEnteredEls.length === 0) {
        _this.setState({
          isDraggingOver: false,
          hasFocus: false
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCancelUploadButtonClicked", function (event) {
      _this.setState({
        uploadProgress: null,
        error: null
      });

      _this.container.current.focus();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleErrorClose", function (event) {
      if (event) {
        event.preventDefault();
      }

      if (_this.state.uploadProgress !== null) {
        return;
      }

      _this.setState({
        invalidFile: false,
        invalidPaste: false,
        error: null,
        uploadProgress: null
      });

      _this.container.current.focus();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSetupButtonClicked", function (event) {
      _this.handleErrorClose(event);

      _this.props.onSetupButtonClicked();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleKeyDown", function (event) {
      if (event.keyCode == ctrlKey || event.keyCode == cmdKey) {
        _this.ctrlDown = true;
      }

      var vKey = 86;

      if (_this.ctrlDown && event.keyCode == vKey) {
        _this.hiddenTextField.current.focus();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleKeyUp", function (event) {
      if (event.keyCode == ctrlKey || event.keyCode == cmdKey) {
        _this.ctrlDown = false;
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFocus", function (event) {
      _this.props.onFocus(event);
    });
    return _this;
  }

  (0, _createClass2["default"])(MuxVideoInputUploader, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unSubscribeToUpload();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _createEventHandler = createEventHandler(),
          _createEventHandler2 = (0, _slicedToArray2["default"])(_createEventHandler, 2),
          onClick$ = _createEventHandler2[0],
          onClick = _createEventHandler2[1];

      this.onCancelUploadButtonClick$ = onClick$;
      this.onCancelUploadButtonClick = onClick;
    }
  }, {
    key: "unSubscribeToUpload",
    value: function unSubscribeToUpload() {
      if (this.upload && !this.upload.closed) {
        this.upload.unsubscribe();
      }
    }
  }, {
    key: "renderUploadPlaceHolder",
    value: function renderUploadPlaceHolder() {
      var _this2 = this;

      if (this.props.children) {
        return null;
      }

      if (this.state.uploadProgress !== null) {
        return null;
      }

      var _this$state = this.state,
          invalidFile = _this$state.invalidFile,
          invalidPaste = _this$state.invalidPaste,
          isDraggingOver = _this$state.isDraggingOver;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_default2["default"], {
        level: 0
      }, /*#__PURE__*/_react["default"].createElement(_UploadPlaceholder["default"], {
        isDraggingOver: isDraggingOver,
        hasFocus: this.props.hasFocus,
        invalidPaste: invalidPaste,
        invalidFile: invalidFile
      })), /*#__PURE__*/_react["default"].createElement(_buttonCollection["default"], null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        inverted: true,
        icon: _uploadIcon["default"],
        onSelect: function onSelect(files) {
          return _this2.handleUploadFile(files[0]);
        },
        accept: 'video/*'
      }, "Select file"), /*#__PURE__*/_react["default"].createElement(_default3["default"], {
        inverted: true,
        onClick: this.props.onBrowse
      }, "Browse")));
    } // eslint-disable-next-line complexity

  }, {
    key: "renderUploadProgress",
    value: function renderUploadProgress() {
      var _this$state2 = this.state,
          uploadProgress = _this$state2.uploadProgress,
          fileInfo = _this$state2.fileInfo,
          url = _this$state2.url;

      if (uploadProgress === null) {
        return null;
      }

      var text = uploadProgress < 100 ? "Uploading ".concat(fileInfo ? "'".concat(fileInfo.name, "'") : 'file') : 'Waiting for MUX to complete the file';

      if (this.state.error) {
        text = this.state.error.message;
      }

      if (url) {
        text = "Uploading ".concat(url);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _Uploader["default"].uploadProgress
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _Uploader["default"].progressBar
      }, /*#__PURE__*/_react["default"].createElement(_bar["default"], {
        percent: uploadProgress,
        text: text,
        isInProgress: uploadProgress === 100 && !this.state.error,
        showPercent: true,
        animation: true,
        color: "primary"
      })), (uploadProgress < 100 || this.state.error) && /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.cancelUploadButton
      }, /*#__PURE__*/_react["default"].createElement(_default3["default"], {
        color: "danger",
        onClick: this.onCancelUploadButtonClick
      }, "Cancel upload")));
    }
  }, {
    key: "renderError",
    value: function renderError() {
      var _this$state3 = this.state,
          uploadProgress = _this$state3.uploadProgress,
          error = _this$state3.error;

      if (!error) {
        return null;
      }

      if (uploadProgress !== null) {
        return null;
      }

      var message = this.state.error.message;

      if (message === 'Invalid credentials') {
        message = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Invalid credentials"), /*#__PURE__*/_react["default"].createElement("p", null, "You need to check your Mux access token and secret key."), /*#__PURE__*/_react["default"].createElement(_default3["default"], {
          color: "primary",
          onClick: this.handleSetupButtonClicked,
          kind: "simple"
        }, "Run setup"));
      }

      return /*#__PURE__*/_react["default"].createElement(_default4["default"], {
        title: "Upload failed",
        color: "danger",
        useOverlay: true,
        onClose: this.handleErrorClose,
        onEscape: this.handleErrorClose,
        onClickOutside: this.handleErrorClose
      }, /*#__PURE__*/_react["default"].createElement(_content["default"], {
        size: "small"
      }, message));
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var _this3 = this;

      if (this.state.uploadProgress === null && this.props.buttons) {
        return /*#__PURE__*/_react["default"].createElement(_buttonCollection["default"], null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
          inverted: true,
          icon: _uploadIcon["default"],
          onSelect: function onSelect(files) {
            return _this3.handleUploadFile(files[0]);
          },
          accept: 'video/*'
        }, "Upload"), this.props.buttons);
      }

      return null;
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      if (this.state.uploadProgress !== null) {
        return null;
      }

      return this.props.children;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _Uploader["default"].root,
        tabIndex: 0,
        onBlur: this.props.onBlur,
        onFocus: this.props.onFocus,
        onDrop: this.handleDrop,
        onKeyDown: this.handleKeyDown,
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDragEnter: this.handleDragEnter,
        ref: this.container
      }, /*#__PURE__*/_react["default"].createElement("input", {
        ref: this.hiddenTextField,
        className: _Uploader["default"].hiddenTextField,
        type: "text",
        onPaste: this.handlePaste
      }), this.renderError(), this.renderUploadProgress(), this.renderUploadPlaceHolder(), this.renderChildren(), this.renderButtons());
    }
  }]);
  return MuxVideoInputUploader;
}(_react.Component);

MuxVideoInputUploader.propTypes = propTypes;
var _default = MuxVideoInputUploader;
exports["default"] = _default;