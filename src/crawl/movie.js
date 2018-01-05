import config from './config.js'

var cheerio = require('cheerio')
var rp = require('request-promise')
// var querystring = require('querystring')
var result = [
  {
    id: 4,
    net: '乐视',
    class: '.play-box',
    keyword: '',
    baseUrl: 'http://so.le.com/s?wd=',
    videoUrl: '',
    image: 'http://sem.g3img.com/site/34030100/20151214155150_90623.jpg'
  },
  {
    id: 2,
    net: '优酷',
    class: '.site14',
    keyword: '',
    baseUrl: 'http://www.soku.com/search_video/q_',
    videoUrl: '',
    image: 'http://pic.pc6.com/up/2013-10/2013102115111.png'
  },
  {
    id: 1,
    net: '腾讯',
    class: '.result_item_v',
    keyword: '',
    baseUrl: 'http://v.qq.com/x/search/?q=',
    videoUrl: '',
    image: 'http://a2.att.hudong.com/63/84/20300542899589141999848362527_s.jpg'
  },
  {
    id: 3,
    net: '爱奇艺',
    class: '.list_item',
    keyword: '',
    baseUrl: 'http://so.iqiyi.com/so/q_',
    videoUrl: '',
    image: 'http://img.25pp.com/uploadfile/app/icon/20161004/1475584237432607.jpg'
  }
]
var options = {
  uri: config.api.domain + config.api.movie + encodeURI('拆弹专家'),
  headers: config.headers,
  transform: function (body) {
    return cheerio.load(body)
  }
}
module.exports = {
  getMovie () {
    // console.log(options)
    rp(options).then(function ($) {
      var vurl = $($(result[2].class)[0]) ? $($(result[2].class)[0]).find('a').attr('href') : ''
      console.log(vurl)
    }).catch(function (e) {
      console.log(e)
    })
  }
}
