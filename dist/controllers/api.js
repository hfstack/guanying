'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delect = exports.Put = exports.Post = exports.Get = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Get = exports.Get = function Get(ctx) {
  ctx.body = {
    result: 'get',
    name: ctx.params.name,
    para: ctx.query
  };
};

var Post = exports.Post = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.body = {
              result: 'post',
              name: ctx.params.name,
              para: ctx.request.body
            };

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function Post(_x) {
    return _ref.apply(this, arguments);
  };
}();

var Put = exports.Put = function Put(ctx) {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  };
};

var Delect = exports.Delect = function Delect(ctx) {
  ctx.body = {
    result: 'delect',
    name: ctx.params.name,
    para: ctx.request.body
  };
};