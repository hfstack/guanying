import KoaRouter from 'koa-router'

import controllers from '../controllers/index.js'

import { handleLess, handleJs } from './jscss-handler'
var env = process.env.NODE_ENV || 'development'

const router = new KoaRouter()

router
  .get('/', (ctx, next) => {
    ctx.redirect('/page/home/index')
  })
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .all('/upload', controllers.upload.default)
  .get('/page/home/index', async (ctx, next) => {
    await Promise.all([controllers.tengxun.getMovieList(), controllers.tengxun.getTvs()]).then(function(res) {
      var movie = res[0]
      var tv = res[1]
      ctx.render('page/home/index', {
        title: '首页',
        movie: movie && movie.length ? movie.slice(0, 6) : [],
        tv: tv && tv.length ? tv.slice(0, 6) : []
      })
    })
  })
  .get('/page/play/index', async (ctx, next) => {
    var url = ctx.query.url;
    var title = ctx.query.title;

    ctx.render('page/play/commonPlay', {
      title: '播放页',
      url: url,
      title: title
    })
  })
  .get('/page/play/tv', async (ctx, next) => {
    var url = ctx.query.url;
    var title = ctx.query.title;
    var id = ctx.query.id;
    var tv = await controllers.tengxun.getTvDetail({id: id})
    ctx.render('page/play/tvPlay', {
      title: '播放页',
      url: url,
      title: title,
      tv: tv
    })
  })
  .get('/page/list/:type', async (ctx, next) => {
    var type = ctx.query.type;
    console.log(type)
    var page = ctx.query.page || 0;
    var pagesize = ctx.query.pagesize || 20;
    var lists = []
    var params = {page: page, pagesize: pagesize}
    if(type === 1) {
      lists = await controllers.tengxun.getMovieList(params)
    } else {
      lists = await controllers.tengxun.getTvList(params)
    }
    ctx.render('page/list/index', {
      title: '列表页',
      type: type,
      list: lists,
      params: {
        pageCount: '',
        pageSize: '',
        countindex: ''
      }
    })
  })
  .get('/api/tv/tvlist', controllers.tengxun.getTvList) // 获取电视剧列表
  .get('/api/tv/detail/:id', controllers.tengxun.getTvDetail) // 获取电视剧详情
  .get('/api/tv/detail/:id', controllers.tengxun.getTvDetail) // 获取电视剧详情
  .get('/api/search', controllers.search.videoSearch)// 


if(env === 'development') {
  router.get('/assets/js/**/*.js', (ctx, next)=>{
    handleJs.do(ctx, next)
  })
  .get('/assets/less/**/*.less', (ctx, next)=>{
    handleLess.do(ctx, next)
  })
}

module.exports = router
