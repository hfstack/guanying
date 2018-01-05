'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTvDetail = exports.getTvList = exports.createTv = exports.getTvs = exports.getMovieList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TvList = require('../models').TvList;
var Tv = require('../models').Tv;
var Movie = require('../models').Movie;
var getMovieList = exports.getMovieList = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    var page, pagesize, MovieList;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = data && data.page || 0;
            pagesize = data && data.pagesize || 20;
            _context.next = 4;
            return Movie.findAll({
              offset: page * pagesize,
              limit: pagesize
            });

          case 4:
            MovieList = _context.sent;
            return _context.abrupt('return', JSON.parse((0, _stringify2.default)(MovieList)));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMovieList(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getTvs = exports.getTvs = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
    var page, pagesize, Tvs;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = data && data.page || 0;
            pagesize = data && data.pagesize || 20;
            _context2.next = 4;
            return TvList.findAll({
              offset: page * pagesize,
              limit: pagesize
            });

          case 4:
            Tvs = _context2.sent;
            return _context2.abrupt('return', JSON.parse((0, _stringify2.default)(Tvs)));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getTvs(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var createTv = exports.createTv = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
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
            return _context3.abrupt('return', true);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createTv(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var getTvList = exports.getTvList = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data) {
    var page, page_size, tvLists;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            page = data && data.page || 0;
            page_size = data && +data.pagesize || 20;
            _context4.next = 4;
            return TvList.findAll({
              offset: page * page_size,
              limit: page_size
            });

          case 4:
            tvLists = _context4.sent;
            return _context4.abrupt('return', JSON.parse((0, _stringify2.default)(tvLists)));

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getTvList(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var getTvDetail = exports.getTvDetail = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data) {
    var tvId, tvDetail;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            tvId = parseInt(data.id) || 1;
            _context5.next = 3;
            return Tv.findAll({
              where: {
                tvListId: tvId
              }
            });

          case 3:
            tvDetail = _context5.sent;
            return _context5.abrupt('return', JSON.parse((0, _stringify2.default)(tvDetail)));

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getTvDetail(_x5) {
    return _ref5.apply(this, arguments);
  };
}();