"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractDroppedFiles = extractDroppedFiles;

var _lodash = require("lodash");

/**
 * Utilities for extracting files from dataTransfer in a predictable cross-browser fashion.
 * Also recursively extracts files from a directory
 * Inspired by https://github.com/component/normalized-upload
 */
function extractDroppedFiles(dataTransfer) {
  var files = Array.from(dataTransfer.files || []);
  var items = Array.from(dataTransfer.items || []);

  if (files && files.length > 0) {
    return Promise.resolve(files);
  }

  return normalizeItems(items).then(_lodash.flatten);
}

function normalizeItems(items) {
  return Promise.all(items.map(function (item) {
    // directory
    if (item.kind === 'file' && item.webkitGetAsEntry) {
      var entry; // Edge throws

      try {
        entry = item.webkitGetAsEntry();
      } catch (err) {
        return [item.getAsFile()];
      }

      if (!entry) {
        return [];
      }

      return entry.isDirectory ? walk(entry) : [item.getAsFile()];
    } // file


    if (item.kind === 'file') {
      var file = item.getAsFile();
      return Promise.resolve(file ? [file] : []);
    } // others


    return new Promise(function (resolve) {
      return item.getAsString(resolve);
    }).then(function (str) {
      return str ? [new File([str], 'unknown.txt', {
        type: item.type
      })] : [];
    });
  }));
}

function walk(entry) {
  if (entry.isFile) {
    return new Promise(function (resolve) {
      return entry.file(resolve);
    }).then(function (file) {
      return [file];
    });
  }

  if (entry.isDirectory) {
    var dir = entry.createReader();
    return new Promise(function (resolve) {
      return dir.readEntries(resolve);
    }).then(function (entries) {
      return entries.filter(function (entr) {
        return !entr.name.startsWith('.');
      });
    }).then(function (entries) {
      return Promise.all(entries.map(walk)).then(_lodash.flatten);
    });
  }

  return Promise.resolve([]);
}