"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Input = _interopRequireDefault(require("../components/Input"));

var _Preview = _interopRequireDefault(require("../components/Preview"));

var _default = {
  name: 'mux.video',
  type: 'object',
  title: 'Video asset reference',
  fields: [{
    title: 'Video',
    name: 'asset',
    type: 'reference',
    to: [{
      type: 'mux.videoAsset'
    }]
  }],
  inputComponent: _Input["default"],
  preview: {
    select: {
      playbackId: 'asset.playbackId',
      status: 'asset.status',
      duration: 'asset.data.duration',
      thumbTime: 'asset.thumbTime',
      filename: 'asset.filename'
    },
    component: _Preview["default"]
  }
};
exports["default"] = _default;