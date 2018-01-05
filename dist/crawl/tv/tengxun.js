'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _tool = require('../utils/tool.js');

var _tvlist = require('../../services/tengxun/tvlist');

var _tvlist2 = _interopRequireDefault(_tvlist);

var _index = require('../../controllers/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = require('../../models');
var async = require('async');
var cheerio = require('cheerio');
var rp = require('request-promise');
var offset = 0;
var allPage = 30;
var lists = [];
var isEnd = false;
var getTvList = function getTvList() {
  var options = {
    uri: _config2.default.tengxun.tv + '&offset=' + offset,
    headers: _config2.default.headers,
    transform: function transform(body) {
      return cheerio.load(body);
    }
  };
  if (isEnd) {
    return;
  }
  rp(options).then(function ($) {
    var $figures_list = $('.figures_list');
    var list = $figures_list.find('.list_item');
    allPage = $('._items').find('a').eq(-1).text();
    isEnd = !$figures_list.length;
    list.each(function () {
      var $item = $(this);
      var roles = [];
      $item.find('.figure_desc').find('a').each(function () {
        var me = $(this);
        roles.push(me.text());
      });
      _tvlist2.default.createTv({
        url: $item.find('.figure').attr('href'),
        name: $item.find('.figure').find('img').eq(0).attr('alt'),
        imgUrl: $item.find('.figure').find('img').eq(0).attr('src'),
        nums: $item.find('.figure_info').text(),
        score: $item.find('.score_l').text() + $item.find('.score_s').text(),
        desc: $item.find('.figure_info').text(),
        roles: roles.join(',')
      });
    });
    offset = offset + 30;
    (0, _tool.sleep)(1000);
    getTvList();
    return null;
  }).catch(function (e) {
    console.log(e);
  });
};
var getTvDetail = function getTvDetail(item, callback) {
  var options = {
    uri: item.url,
    headers: _config2.default.headers,
    transform: function transform(body) {
      return cheerio.load(body);
    }
  };
  rp(options).then(function ($) {
    var $scroll_wrap = $('.scroll_wrap');
    var title = $('.player_title').find('a').text();
    var list = $scroll_wrap.find('.mod_episode').find('.item');
    list.each(function () {
      var $item = $(this);
      var roles = [];
      _tvlist2.default.createTvDetail({
        tvListId: +item.id,
        title: title,
        url: _config2.default.tengxun.domain + $item.find('a').attr('href'),
        content: $item.find('a').text().trim()
      });
    });
    callback(null, 'successful');
    return null;
  }).catch(function (e) {
    console.log(e);
  });
};
var getTV = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    var page, pagesize, tvLists, searchResult;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = data && data.page || 0;
            pagesize = data && data.pagesize || 20;
            _context.next = 4;
            return models.TvList.findAll({
              offset: page * pagesize,
              limit: pagesize
            });

          case 4:
            tvLists = _context.sent;
            searchResult = JSON.parse((0, _stringify2.default)(tvLists));

            if (!searchResult.length) {
              _context.next = 11;
              break;
            }

            // 使用async控制异步抓取   
            // mapLimit(arr, limit, iterator, [callback])
            async.mapLimit(searchResult, 1, function (item, callback) {
              (0, _tool.sleep)(1000);
              getTvDetail(item, callback);
            }, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
              }
            });
            getTV({
              page: page += 1,
              pagesize: 20
            });
            _context.next = 12;
            break;

          case 11:
            return _context.abrupt('return', false);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTV(_x) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  getTvList: getTvList,
  getTV: getTV
};