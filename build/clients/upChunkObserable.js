"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpChunkObservable = createUpChunkObservable;

var UpChunk = _interopRequireWildcard(require("@mux/upchunk"));

var _rxjs = require("rxjs");

function createUpChunkObservable(uuid, uploadUrl, source) {
  return new _rxjs.Observable(function (subscriber) {
    var upchunk = UpChunk.createUpload({
      endpoint: uploadUrl,
      file: source,
      chunkSize: 5120 // Uploads the file in ~5mb chunks

    });

    var successHandler = function successHandler() {
      subscriber.next({
        type: 'success',
        id: uuid
      });
      subscriber.complete();
    };

    var errorHandler = function errorHandler(data) {
      return subscriber.error(new Error(data.detail.message));
    };

    var progressHandler = function progressHandler(data) {
      return subscriber.next({
        type: 'progress',
        percent: data.detail
      });
    };

    var offlineHandler = function offlineHandler(data) {
      upchunk.pause();
      subscriber.next({
        type: 'pause',
        id: uuid
      });
    };

    var onlineHandler = function onlineHandler(data) {
      upchunk.resume();
      subscriber.next({
        type: 'resume',
        id: uuid
      });
    };

    upchunk.on('success', successHandler);
    upchunk.on('error', errorHandler);
    upchunk.on('progress', progressHandler);
    upchunk.on('offline', offlineHandler);
    upchunk.on('online', onlineHandler);
    return function () {
      upchunk.pause(); // Should be teared down here, but upChunk doesn't support it
    };
  });
}