import config from '../config.js'
import {sleep} from '../utils/tool.js'
import Movie from '../../services/tengxun/movie'
var cheerio = require('cheerio')
var rp = require('request-promise')
var offset = 0
var allPage = 30;
var isEnd = false
const getMovie = function() {
  var options = {
    uri: config.tengxun.movie + '&offset=' + offset,
    headers: config.headers,
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  if(isEnd) {
    return ;
  }
  rp(options).then(function ($) {
    var $figures_list = $('.figures_list')
    var list = $figures_list.find('.list_item')
    isEnd = !$figures_list.length
    list.each(function() {
      let $item = $(this)
      Movie.createMovie({
        url: $item.find('a').attr('href'),
        name: $item.find('.figure_title').find('a').text(),
        imgUrl: $item.find('img').attr('r-lazyload'),
        desc: $item.find('.figure_info').text()
      })
    })
    offset = offset + 30;
    sleep(1000)
    console.log('----------------' + offset + '---------------')
    getMovie()
    return null;
  }).catch(function (e) {
    console.log(e)
  })
}
module.exports = {
  getMovie
}