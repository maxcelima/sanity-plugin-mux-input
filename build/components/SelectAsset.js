"use strict";

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

var _react = _interopRequireDefault(require("react"));

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _default = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _SelectAsset = _interopRequireDefault(require("./SelectAsset.css"));

var _getPosterSrc = _interopRequireDefault(require("../util/getPosterSrc"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PER_PAGE = 200;

function createQuery() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PER_PAGE;
  return "*[_type == \"mux.videoAsset\"] | order(_updatedAt desc) [".concat(start, "...").concat(end, "] {_id, playbackId, thumbTime}");
}

var SelectAsset = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SelectAsset, _React$Component);

  var _super = _createSuper(SelectAsset);

  function SelectAsset() {
    var _this;

    (0, _classCallCheck2["default"])(this, SelectAsset);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      assets: [],
      isLastPage: false,
      isLoading: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pageNo", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleItemClick", function (event) {
      event.preventDefault();

      _this.select(event.currentTarget.getAttribute('data-id'));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleItemKeyPress", function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();

        _this.select(event.currentTarget.getAttribute('data-id'));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFetchNextPage", function () {
      _this.fetchPage(++_this.pageNo);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleImageError", function (event) {
      var imageElm = event.currentTarget;
      imageElm.src = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB5PSIwcHgiPjx0aXRsZT5JY29ucyAvIEdlbmVyYWwgLyBMYXJnZSAvIFVua25vd248L3RpdGxlPjxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0yOS42MTQ1OTYxLDYuNSBMMzcuNSwxNC4zMjUwNjUgTDM3LjUsMzkuMzI2NDQ0NyBDMzcuNSw0MC41Mjk0ODk3IDM2LjUzMDMzNjYsNDEuNSAzNS4zMjM3MzA1LDQxLjUgTDExLjY3NjI2OTUsNDEuNSBDMTAuNDc0MTY5Niw0MS41IDkuNSw0MC41MjU4OTM3IDkuNSwzOS4zMjM1NjAxIEw5LjUsOC42NzY0Mzk5MiBDOS41LDcuNDc1MjA3OTYgMTAuNDY5NTU4MSw2LjUgMTEuNjU4MDg4Nyw2LjUgTDI5LjYxNDU5NjEsNi41IFoiIHN0cm9rZT0iIzAwMDAwMCI+PC9wYXRoPjxwb2x5Z29uIGZpbGw9IiMwMDAwMDAiIHBvaW50cz0iMjkgOCAzNSAxNCAyOSAxNCI+PC9wb2x5Z29uPjxwYXRoIGQ9Ik0yMS40NTY1NzU5LDI4LjkwMTg1NjggQzIxLjQ1NjU3NTksMjguNTk0MTYyOSAyMS41NjA5NzA4LDI4LjMzNDIxODYgMjEuNzY5NzYzNywyOC4xMjIwMTU5IEMyMS45Nzg1NTY2LDI3LjkwOTgxMzMgMjIuMjMxNzE0MiwyNy44MDM3MTM1IDIyLjUyOTI0NDEsMjcuODAzNzEzNSBDMjIuODI2Nzc0LDI3LjgwMzcxMzUgMjMuMDc5OTMxNiwyNy45MDk4MTMzIDIzLjI4ODcyNDUsMjguMTIyMDE1OSBDMjMuNDk3NTE3NCwyOC4zMzQyMTg2IDIzLjYwMTkxMjMsMjguNTk0MTYyOSAyMy42MDE5MTIzLDI4LjkwMTg1NjggQzIzLjYwMTkxMjMsMjkuMjA5NTUwNiAyMy40OTc1MTc0LDI5LjQ2OTQ5NSAyMy4yODg3MjQ1LDI5LjY4MTY5NzYgQzIzLjA3OTkzMTYsMjkuODkzOTAwMyAyMi44MjY3NzQsMzAgMjIuNTI5MjQ0MSwzMCBDMjIuMjMxNzE0MiwzMCAyMS45Nzg1NTY2LDI5Ljg5MzkwMDMgMjEuNzY5NzYzNywyOS42ODE2OTc2IEMyMS41NjA5NzA4LDI5LjQ2OTQ5NSAyMS40NTY1NzU5LDI5LjIwOTU1MDYgMjEuNDU2NTc1OSwyOC45MDE4NTY4IFogTTIwLjkzOTgxNiwxOC45MDcxNjE4IEMyMS41NzY2MzQ0LDE4LjMwMjM4NDIgMjIuNDI0ODQyOSwxOCAyMy40ODQ0NjY5LDE4IEMyNC41NDQwOTA5LDE4IDI1LjM5NDkwOTMsMTguMjk3MDc5MyAyNi4wMzY5NDc1LDE4Ljg5MTI0NjcgQzI2LjY3ODk4NTcsMTkuNDg1NDE0MSAyNywyMC4zMjYyNTQ1IDI3LDIxLjQxMzc5MzEgQzI3LDIyLjUwMTMzMTcgMjYuNjkyMDM1MSwyMy4yOTQ0MjcyIDI2LjA3NjA5NiwyMy43OTMxMDM0IEMyNS40NjAxNTY5LDI0LjI5MTc3OTcgMjQuNTQ2NzAxNiwyNC41NDY0MTkgMjMuMzM1NzAyNywyNC41NTcwMjkyIEwyMy4zMzU3MDI3LDI2LjQ5ODY3MzcgTDIxLjY0NDQ4ODUsMjYuNDk4NjczNyBMMjEuNjQ0NDg4NSwyMy4zMTU2NDk5IEwyMi4zOTYxMzkzLDIzLjMxNTY0OTkgQzIzLjM3NzQ2NiwyMy4zMjYyNiAyNC4xMDU2MjAzLDIzLjE5NjI4NzggMjQuNTgwNjI0MiwyMi45MjU3Mjk0IEMyNS4wNTU2MjgxLDIyLjY1NTE3MTEgMjUuMjkzMTI2NSwyMi4xMjIwMTk5IDI1LjI5MzEyNjUsMjEuMzI2MjU5OSBDMjUuMjkzMTI2NSwyMC43NjM5MjI5IDI1LjEzMzkyNDMsMjAuMzIzNjA5IDI0LjgxNTUxNTEsMjAuMDA1MzA1IEMyNC40OTcxMDU5LDE5LjY4NzAwMTEgMjQuMDU2MDM3NSwxOS41Mjc4NTE1IDIzLjQ5MjI5NjYsMTkuNTI3ODUxNSBDMjIuOTI4NTU1NywxOS41Mjc4NTE1IDIyLjQ4NDg3NzQsMTkuNjgxNjk2MSAyMi4xNjEyNDg0LDE5Ljk4OTM4OTkgQzIxLjgzNzYxOTQsMjAuMjk3MDgzOCAyMS42NzU4MDczLDIwLjcyNjc4NzcgMjEuNjc1ODA3MywyMS4yNzg1MTQ2IEwyMC4wMDAyNTI2LDIxLjI3ODUxNDYgQzE5Ljk4OTgxMjksMjAuMzAyMzgyNCAyMC4zMDI5OTc2LDE5LjUxMTkzOTQgMjAuOTM5ODE2LDE4LjkwNzE2MTggWiIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+';
      imageElm.width = 100;
      imageElm.height = 100;
    });
    return _this;
  }

  (0, _createClass2["default"])(SelectAsset, [{
    key: "fetchPage",
    value: function fetchPage(pageNo) {
      var _this2 = this;

      var start = pageNo * PER_PAGE;
      var end = start + PER_PAGE;
      this.setState({
        isLoading: true
      });
      return _client["default"].fetch(createQuery(start, end)).then(function (result) {
        _this2.setState(function (prevState) {
          return {
            isLastPage: result.length === 0,
            assets: prevState.assets.concat(result),
            isLoading: false
          };
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchPage(this.pageNo);
    }
  }, {
    key: "select",
    value: function select(id) {
      var selected = this.state.assets.find(function (doc) {
        return doc._id === id;
      });

      if (selected) {
        this.props.onSelect(selected);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          assets = _this$state.assets,
          isLastPage = _this$state.isLastPage,
          isLoading = _this$state.isLoading;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _SelectAsset["default"].root
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _SelectAsset["default"].imageList
      }, assets.map(function (asset) {
        var size = 80;
        var width = 100;
        var height = 100;
        var posterUrl = (0, _getPosterSrc["default"])(asset.playbackId, {
          time: asset.thumbTime,
          fitMode: 'crop',
          width: 100,
          height: 100
        });
        return /*#__PURE__*/_react["default"].createElement("a", {
          key: asset._id,
          className: _SelectAsset["default"].item,
          "data-id": asset._id,
          onClick: _this3.handleItemClick,
          onKeyPress: _this3.handleItemKeyPress,
          tabIndex: 0,
          style: {
            width: "".concat(width * size / height, "px"),
            flexGrow: "".concat(width * size / height)
          }
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: _SelectAsset["default"].padder,
          style: {
            paddingBottom: "".concat(height / width * 100, "%")
          }
        }), /*#__PURE__*/_react["default"].createElement("img", {
          onError: _this3.handleImageError,
          src: posterUrl,
          className: _SelectAsset["default"].image,
          title: asset.filename || asset.playbackId
        }));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _SelectAsset["default"].loadMore
      }, !isLastPage && /*#__PURE__*/_react["default"].createElement(_default["default"], {
        onClick: this.handleFetchNextPage,
        loading: isLoading
      }, "Load more")));
    }
  }]);
  return SelectAsset;
}(_react["default"].Component);

exports["default"] = SelectAsset;