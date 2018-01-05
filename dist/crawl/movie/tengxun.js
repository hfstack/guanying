'use strict';

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _tool = require('../utils/tool.js');

var _movie = require('../../services/tengxun/movie');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cheerio = require('cheerio');
var rp = require('request-promise');
var offset = 0;
var allPage = 30;
var isEnd = false;
var getMovie = function getMovie() {
  var options = {
    uri: _config2.default.tengxun.movie + '&offset=' + offset,
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
    isEnd = !$figures_list.length;
    list.each(function () {
      var $item = $(this);
      _movie2.default.createMovie({
        url: $item.find('a').attr('href'),
        name: $item.find('.figure_title').find('a').text(),
        imgUrl: $item.find('img').attr('r-lazyload'),
        desc: $item.find('.figure_info').text()
      });
    });
    offset = offset + 30;
    (0, _tool.sleep)(1000);
    console.log('----------------' + offset + '---------------');
    getMovie();
    return null;
  }).catch(function (e) {
    console.log(e);
  });
};
module.exports = {
  getMovie: getMovie
};