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

var _hls = _interopRequireDefault(require("hls.js"));

var _bar = _interopRequireDefault(require("part:@sanity/components/progress/bar"));

var _default2 = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _assets = require("../actions/assets");

var _getPosterSrc = _interopRequireDefault(require("../util/getPosterSrc"));

var _Video = _interopRequireDefault(require("./Video.css"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var NOOP = function NOOP() {};

var propTypes = {
  assetDocument: _propTypes["default"].object.isRequired,
  autoload: _propTypes["default"].bool,
  onCancel: _propTypes["default"].func,
  onReady: _propTypes["default"].func
};

var MuxVideo = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(MuxVideo, _Component);

  var _super = _createSuper(MuxVideo);

  function MuxVideo() {
    var _this;

    (0, _classCallCheck2["default"])(this, MuxVideo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      posterUrl: null,
      source: null,
      isLoading: true,
      error: null,
      isDeletedOnMux: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "videoContainer", /*#__PURE__*/_react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hls", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleVideoClick", function (event) {
      _this.setState({
        showControls: true
      });

      _this.hls.startLoad(0);

      if (_this.props.onReady) {
        _this.props.onReady(event);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCancelButtonClicked", function (event) {
      if (_this.props.onCancel) {
        _this.props.onCancel(event);
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(MuxVideo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.video = /*#__PURE__*/_react["default"].createRef();
      this.setState(MuxVideo.getDerivedStateFromProps(this.props));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.source !== null && this.video.current && !this.video.current.src) {
        this.setState({
          error: null
        });
        this.attachVideo();
      }

      if (this.state.source !== null && this.state.source !== prevState.source) {
        this.setState({
          error: null,
          showControls: false
        });

        if (this.hls) {
          this.hls.destroy();
        }

        this.attachVideo();
      }
    }
  }, {
    key: "getVideoElement",
    value: function getVideoElement() {
      return this.video && this.video.current;
    }
  }, {
    key: "attachVideo",
    value: function attachVideo() {
      var _this2 = this;

      var _this$props = this.props,
          assetDocument = _this$props.assetDocument,
          autoload = _this$props.autoload;

      if (_hls["default"].isSupported()) {
        this.hls = new _hls["default"]({
          autoStartLoad: autoload
        });
        this.hls.loadSource(this.state.source);
        this.hls.attachMedia(this.video.current);
        this.hls.on(_hls["default"].Events.MANIFEST_PARSED, function () {
          if (_this2.videoContainer.current) {
            _this2.videoContainer.current.style.display = 'block';
          }

          if (_this2.props.onReady) {
            _this2.props.onReady();
          }
        });
        this.hls.on(_hls["default"].Events.ERROR, function (event, data) {
          switch (data.type) {
            case _hls["default"].ErrorTypes.NETWORK_ERROR:
              if (_this2.videoContainer.current) {
                _this2.videoContainer.current.style.display = 'none';
              }

              _this2.setState({
                error: data
              });

              (0, _assets.getAsset)(assetDocument.assetId).then(function (response) {
                _this2.setState({
                  isDeletedOnMux: false
                });
              })["catch"](function (err) {
                if (err.message.match(/404/)) {
                  _this2.setState({
                    isDeletedOnMux: true
                  });

                  return;
                }

                console.error(data, err); // eslint-disable-line no-console
              });
              break;

            default:
              console.error(data);
            // eslint-disable-line no-console
          }
        });
      } else if (this.video.current.canPlayType('application/vnd.apple.mpegurl')) {
        this.video.current.src = this.state.source;
        this.video.current.addEventListener('loadedmetadata', function () {
          _this2.hls.loadSource(_this2.state.source);

          _this2.hls.attachMedia(_this2.video.current);
        });
      }
    }
  }, {
    key: "render",
    value: // eslint-disable-next-line complexity
    function render() {
      var _this$state = this.state,
          posterUrl = _this$state.posterUrl,
          isLoading = _this$state.isLoading,
          error = _this$state.error;
      var _this$props2 = this.props,
          assetDocument = _this$props2.assetDocument,
          autoload = _this$props2.autoload;

      if (!assetDocument || !assetDocument.status) {
        return null;
      }

      if (isLoading) {
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
          className: _Video["default"].progressBar
        }, /*#__PURE__*/_react["default"].createElement(_bar["default"], {
          percent: 100,
          text: isLoading !== true && isLoading || 'Waiting for MUX to complete the file',
          isInProgress: true,
          showPercent: true,
          animation: true,
          color: "primary"
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: _Video["default"].uploadCancelButton
        }, /*#__PURE__*/_react["default"].createElement(_default2["default"], {
          onClick: this.handleCancelButtonClicked
        }, "Cancel")));
      }

      var showControls = autoload || this.state.showControls;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.videoContainer,
        className: _Video["default"].videoContainer
      }, /*#__PURE__*/_react["default"].createElement("video", {
        className: _Video["default"].root,
        onClick: autoload ? NOOP : this.handleVideoClick,
        controls: showControls,
        ref: this.video,
        poster: posterUrl
      })), error && /*#__PURE__*/_react["default"].createElement("div", {
        className: [_Video["default"].videoContainer, _Video["default"].videoError].join(' ')
      }, /*#__PURE__*/_react["default"].createElement("p", null, "There was an error loading this video (", error.type, ")."), this.state.isDeletedOnMux && /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "The video is deleted on MUX.com"))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: // eslint-disable-next-line complexity
    function getDerivedStateFromProps(nextProps) {
      var source = null;
      var posterUrl = null;
      var isLoading = true;
      var assetDocument = nextProps.assetDocument;

      if (assetDocument && assetDocument.status === 'preparing') {
        isLoading = 'Preparing the video';
      }

      if (assetDocument && assetDocument.status === 'waiting_for_upload') {
        isLoading = 'Waiting for upload to start';
      }

      if (assetDocument && assetDocument.status === 'waiting') {
        isLoading = 'Processing upload';
      }

      if (assetDocument && assetDocument.status === 'ready') {
        isLoading = false;
      }

      if (assetDocument && assetDocument.playbackId) {
        source = "https://stream.mux.com/".concat(assetDocument.playbackId, ".m3u8");
        posterUrl = (0, _getPosterSrc["default"])(assetDocument.playbackId, {
          time: assetDocument.thumbTime || 1,
          fitMode: 'preserve'
        });
      }

      if (assetDocument && typeof assetDocument.status === 'undefined') {
        isLoading = false;
      }

      return {
        isLoading: isLoading,
        source: source,
        posterUrl: posterUrl
      };
    }
  }]);
  return MuxVideo;
}(_react.Component);

(0, _defineProperty2["default"])(MuxVideo, "defaultProps", {
  autoload: true
});
MuxVideo.propTypes = propTypes;
var _default = MuxVideo;
exports["default"] = _default;