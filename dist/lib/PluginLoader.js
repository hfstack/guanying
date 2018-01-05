'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function getDirs (srcpath) {
//   return fs.readdirSync(srcpath).filter(file => {
//     return fs.statSync(path.join(srcpath, file)).isDirectory()
//   })
// }

// import fs from 'fs'
module.exports = function (srcpath) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'index.js';

  var plugins = {};
  var dirs = getDirs(srcpath);
  var list = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var name = _step.value;

      var fn = require(_path2.default.join(srcpath, name, filename));

      if (typeof fn !== 'function' && typeof fn.default === 'function') {
        fn = fn.default;
      } else {
        throw new Error('plugin must be a function!');
      }

      plugins[name] = fn;

      list.push(function (ctx, next) {
        return fn(ctx, next) || next();
      });
    };

    for (var _iterator = (0, _getIterator3.default)(dirs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (0, _koaCompose2.default)(list);
};