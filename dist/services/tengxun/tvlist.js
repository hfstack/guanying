'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TvList = require('../../models').TvList;
var Tv = require('../../models').Tv;
var createTv = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return TvList.create({
              imgUrl: data.imgUrl,
              name: data.name,
              desc: data.desc,
              url: data.url,
              nums: data.num,
              score: data.score,
              roles: data.roles
            });

          case 2:
            return _context.abrupt('return', true);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createTv(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getTvUrl = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
    var page, page_size, tvLists;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = parseInt(data.page) || 0;
            page_size = parseInt(data.page_size) || 1;
            _context2.next = 4;
            return TvList.findAll({
              offset: page * page_size,
              limit: page_size,
              attributes: ['id', 'url']
            });

          case 4:
            tvLists = _context2.sent;
            return _context2.abrupt('return', JSON.parse((0, _stringify2.default)(tvLists)));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getTvUrl(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var createTvDetail = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Tv.create({
              url: data.url,
              content: data.content,
              title: data.title,
              tvListId: data.tvListId
            });

          case 2:
            return _context3.abrupt('return', true);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createTvDetail(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
module.exports = {
  createTv: createTv,
  getTvUrl: getTvUrl,
  createTvDetail: createTvDetail
};