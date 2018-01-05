'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJsonLength = exports.HovercUnique = exports.SqlFormat = exports.OptionFormat = exports.setString = undefined;

var _config = require('../config');

// 截取字符串，多余的部分用...代替
var setString = exports.setString = function setString(str, len) {
  var StrLen = 0;
  var s = '';
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      StrLen += 2;
    } else {
      StrLen++;
    }
    s += str.charAt(i);
    if (StrLen >= len) {
      return s + '...';
    }
  }
  return s;
};

// 格式化设置
var OptionFormat = exports.OptionFormat = function OptionFormat(GetOptions) {
  var options = '{';
  for (var n = 0; n < GetOptions.length; n++) {
    options = options + '\'' + GetOptions[n].option_name + '\':\'' + GetOptions[n].option_value + '\'';
    if (n < GetOptions.length - 1) {
      options = options + ',';
    }
  }
  return JSON.parse(options + '}');
};

// 替换SQL字符串中的前缀
var SqlFormat = exports.SqlFormat = function SqlFormat(str) {
  if (_config.SystemConfig.mysql_prefix !== 'api_') {
    str = str.replace(/api_/g, _config.SystemConfig.mysql_prefix);
  }
  return str;
};

// 数组去重
var HovercUnique = exports.HovercUnique = function HovercUnique(arr) {
  var n = {};
  var r = [];
  for (var i = 0; i < arr.length; i++) {
    if (!n[arr[i]]) {
      n[arr[i]] = true;
      r.push(arr[i]);
    }
  }
  return r;
};

// 获取json长度
var getJsonLength = exports.getJsonLength = function getJsonLength(jsonData) {
  var arr = [];
  for (var item in jsonData) {
    arr.push(jsonData[item]);
  }
  return arr.length;
};