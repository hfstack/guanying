var less = require('less')
var fs = require('fs')
var browserify = require('browserify');
var autoprefixer = require('gulp-autoprefixer')
var util = require('gulp-util')
var uglify = require('gulp-uglify')
var minify = require('gulp-minify-css')
var exec = require('child_process').exec
const babel = require('gulp-babel')
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const nodemon = require('gulp-nodemon')
var util = require('gulp-util'); // 主要输出错误log   https://www.npmjs.com/package/gulp-util
var through = require('through2'); // through2是对node.js原生stream.Transform进行的封装 http://www.zhihu.com/question/39391770
require('shelljs/global'); // 支持rm删除文件

const friendlyFormatter = require('eslint-friendly-formatter')
// 流错误处理
var errStream = function(stream, err) {
  // 输出错误信息
  util.log(err);

  stream.emit('error', err);
  // 结束流
  stream.emit('end');
};

var logStream = function(text) {
  return through.obj(function(file, env, callback) {
    // 输出log
    util.log(util.colors.blue(file.relative) + ' ' + text);
    callback(null, file);
  });
};

var jsScript = 'node'
if (process.env.npm_config_argv !== undefined && process.env.npm_config_argv.indexOf('debug') > 0) {
  jsScript = 'node debug'
}
// @browserify 
var getBrowserifyStream = function() {
  return through.obj(function(file, env, callback) {
    var self = this,
      filePath = file.path;

    // browserify解析js
    var b = browserify({
      entries: filePath
    });

    b.bundle(function(err, buffer) {
      if (err) {
        errStream(self, err);
        return;
      }
      file._contents = buffer;
      callback(null, file);
    });
  });
};

// 生成带时间戳的线上文件
var date;
var parseTimePath = function(extName) {
  date = new Date();
  var month = date.getMonth() + 1;
  var minutes = date.getMinutes();

  // 增加时间戳
  date = date.getFullYear() + '' + (month < 10 ? '0' + month : month) + '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '' + date.getHours() + '' + (minutes < 10 ? '0' + minutes : minutes);

  return through.obj(function(file, env, callback) {
    var datePath = file.path.replace('.debug.' + extName, '_' + date + '.' + extName);
    file.path = datePath;
    callback(null, file);
  });
};

// 生成debug文件路径
var parseDebugPath = function(extName, originExtName) {
  return through.obj(function(file, env, callback) {
    // 修改path的扩展名为debug.css或debug.js 
    var debugPath = file.path.replace('.' + (originExtName || extName), '.debug.' + extName);
    file.path = debugPath;
    callback(null, file);
  });
};
// less -> gulp
var getLessStream = function() {
  // less解析出错时的替换内容
  var errCssMsg = [
    "body:before{",
    "content:'这个文件打包出了问题，请检查相应less文件';",
    "position:fixed;",
    "background:#000;",
    "left:0;top:0;padding:1rem;",
    "}"
  ].join('');

  return through.obj(function(file, env, callback) {

    var self = this;
    var content = file.contents.toString();

    // 使用less解析文件内容
    less.render(content, {
      filename: file.path
    }, function(e, output) {
      if (e) {
        // 错误处理
        errStream(self, e);

        // less解析出错 输出错误提示
        file.contents = new Buffer(errCssMsg, 'utf8');
        callback(null, file);

      } else {
        // 将解析的内容塞到流内
        file.contents = new Buffer(output.css, 'utf8');
        callback(null, file);
      }
    });
  });
};
// 为html文件内的, 正则匹配js css路径添加md5
var md5HtmlStream = function(isBuild) {

  // 处理html文件的流
  return through.obj(function(file, env, callback) {

    var html = file.contents.toString();

    // 获取css链接的正则
    var cssReg = /(\<link.+?href\=["'])(.+?)(["'])/g;
    // 获取js链接的正则
    var scriptReg = /(\<script.+?src\=["'])(.+?)(["'])/g;
    
    // 根据transformSrcFunc获得目标路径
    var replaceFunc = function(transformSrcFunc) {

      return function(s, $1, $2, $3) {

        var distPath = transformSrcFunc($2);

        return $1 + distPath + $3;
      };
    };

    // 生成script替换函数
    var replaceScriptFunc = replaceFunc(function(src) {

      return src.trim()
        // 替换路径
        // .replace(/[\\\/]src[\\\/]js[\\\/]/, isBuild ? '//yun.duiba.com.cn/maila/h5/' : '//yun.dui88.com/maila/h5/')
        // 替换扩展名
        .replace(/\.js/, '_' + date + '.js');

    });

    // 生成css替换函数
    var replaceCssFunc = replaceFunc(function(src) {

      return src.trim()
        // 替换路径
        // .replace(/[\\\/]src[\\\/]less[\\\/]/, isBuild ? '//yun.duiba.com.cn/maila/h5/' : '//yun.dui88.com/maila/h5/')
        // 替换扩展名
        .replace(/\.less/, '_' + date + '.css')
        .replace(/less/, 'css');


    });

    // 获得最终的html
    var result = html.replace(scriptReg, replaceScriptFunc)
      .replace(cssReg, replaceCssFunc);

    file.contents = new Buffer(result, 'utf8');
    callback(null, file);

  });
};

function lintOne (aims) {
  console.log('ESlint:' + aims)
  console.time('Finished eslint')
  return gulp.src(aims)
    .pipe(eslint({configFile: './.eslintrc.js'}))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(results => {
      // Called once for all ESLint results.
      console.log(`- Total Results: ${results.length}`)
      console.log(`- Total Warnings: ${results.warningCount}`)
      console.log(`- Total Errors: ${results.errorCount}`)
      console.timeEnd('Finished eslint')
    }))
}
// 删除asset文件 
gulp.task('deleteAsset', function() {
  var child;
  child = exec('rm -rf dist', function(err, out) {
    console.log(out);
    err && console.log(err);
  });
});

gulp.task('ESlint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint({configFile: './.eslintrc.js'}))
    .pipe(eslint.format(friendlyFormatter))
    // .pipe(eslint.failAfterError())
    .pipe(eslint.results(results => {
      // Called once for all ESLint results.
      console.log(`- Total Results: ${results.length}`)
      console.log(`- Total Warnings: ${results.warningCount}`)
      console.log(`- Total Errors: ${results.errorCount}`)
    }))
})

gulp.task('ESlint_nodemon',['ESlint'], function () {
  var stream = nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: jsScript
    },
    tasks: function (changedFiles) {
      lintOne(changedFiles)
      return []
    },
    verbose: true,
    ignore: ['build/*.js', 'dist/*.js', 'nodemon.json', '.git', 'node_modules/**/node_modules', 'gulpfile.js'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  })

  return stream
    .on('restart', function () {
      // console.log('Application has restarted!')
    })
    .on('crash', function () {
      console.error('Application has crashed!\n')
      // stream.emit('restart', 20)  // restart the server in 20 seconds
    })
})

gulp.task('nodemon', function () {
  return nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: jsScript
    },
    verbose: true,
    ignore: ['build/*.js', 'dist/*.js', 'nodemon.json', '.git', 'node_modules/**/node_modules', 'gulpfile.js'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  })
})
// 打包js
gulp.task('js', function() {

  return gulp.src('./assets/js/**/*.js')
    // 任务开始log
    .pipe(logStream('task start'))
    // eslint 
    // .pipe(eslint())
    // .pipe(eslint.format())
    // 使用browserify解析
    .pipe(getBrowserifyStream())
    .pipe(babel({
      presets: ['es2015']
    }))
    // 生成debug文件         
    .pipe(parseDebugPath('js'))
    .pipe(gulp.dest('./dist/assets/js/'))
    // 压缩文件 
    .pipe(uglify())
    // 生成线上版本
    // .pipe(parsePath('js'))
    // .pipe(gulp.dest('./asset/js/'))
    // 生成带时间戳的JS 到asset目录下
    .pipe(parseTimePath('js'))
    .pipe(gulp.dest('./dist/assets/js/'))
    // 任务结束log
    .pipe(logStream('task finish'));
});
// 打包js
gulp.task('server', function() {
  return gulp.src('./src/**/*.js')
    .pipe(logStream('task start'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/'))
    // 任务结束log
    .pipe(logStream('task finish'));
});
// 打包css
gulp.task('css', function() {

  return gulp.src('./assets/less/**/*.less')
    // 任务开始log
    .pipe(logStream('task start'))
    // 处理less文件
    .pipe(getLessStream())
    // 生成debug文件
    .pipe(autoprefixer({
      browsers: ['> 5%', 'last 2 versions']
    }))
    .pipe(parseDebugPath('css', 'less'))
    .pipe(gulp.dest('./dist/assets/css/'))
    // 压缩代码
    .pipe(minify())
    // 生成线上代码
    // .pipe(parsePath('css'))
    // .pipe(gulp.dest('./asset/css/'))
    // 生成带时间戳的css 到另外一个目录下
    .pipe(parseTimePath('css'))
    .pipe(gulp.dest('./dist/assets/css/'))
    // 任务结束log
    .pipe(logStream('task finish'));
});
// build模式
gulp.task('buildHtml', function(){
  return gulp.src('./src/view/**/*.html')
    // 开始日志输出
    .pipe(logStream('buildHtml start'))
    // 为html内的资源加md5
    .pipe(md5HtmlStream(true))
    // 复制到html目录下
    .pipe(gulp.dest('./dist/view'))
    // 结束日志输出
    .pipe(logStream('buildHtml finish'));
});

// debug模式 开发模式
gulp.task('html', function() {
  return gulp.src('./src/view/page/*.html')
    // 开始日志输出
    .pipe(logStream('task start'))
    // 为html内的资源加md5
    .pipe(md5HtmlStream())
    // 复制到html目录下
    .pipe(gulp.dest('./dist/view/page'))
    // 结束日志输出
    .pipe(logStream('task finish'));
});
// debug模式 开发模式
gulp.task('image', function() {
  return gulp.src('./assets/images/**/*.{png,jpg,jpeg}')
    // 开始日志输出
    .pipe(logStream('task start'))
    // 复制到html目录下
    .pipe(gulp.dest('./dist/assets/images'))
    // 结束日志输出
    .pipe(logStream('task finish'));
});

gulp.task('default', [ 'ESlint', 'js', 'css', 'ESlint_nodemon'], function () {
  // console.log('ESlin检查完成')
})
gulp.task('build', [ 'deleteAsset', 'server', 'js', 'css', 'image', 'buildHtml'], function () {
  // console.log('ESlin检查完成')
})
