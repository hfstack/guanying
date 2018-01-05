'use strict';

module.exports = {
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
  },
  api: {
    domain: 'http://v.qq.com/x/search/?q=',
    movie: '',
    television: ''
  },
  tengxun: {
    domain: 'http://v.qq.com',
    movie: 'http://v.qq.com/x/list/movie?cate=10001',
    tv: 'http://v.qq.com/x/list/tv?iyear=1&sort=18',
    tvDetail: 'https://v.qq.com'
  },
  domain: 'http://127.0.0.1',
  port: 18080
};