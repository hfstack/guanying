'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * less 和js 处理函数
 */
var browserify = require('browserify');
var less = require('less');

exports.handleLess = {
  showError: function showError(e) {
    var spaces = '';
    var errorContent = e.filename + ' : ' + e.line + '\n\n';
    errorContent += '--------------------------' + '\n';
    errorContent += (e.extract[0] ? e.extract[0] : '') + '\n';
    errorContent += e.extract[1] + '\n';
    spaces += e.extract[1].match(/[\t]*/) && e.extract[1].match(/[\t]*/)[0];
    for (; e.column--;) {
      spaces += ' ';
    }errorContent += spaces + '^^' + '\n';
    errorContent += (e.extract[2] ? e.extract[2] : '') + '\n';
    errorContent += '--------------------------' + '\n\n';
    errorContent += 'message : ' + e.message;
    return errorContent;
  },
  do: function _do(ctx) {
    var self = this;
    var req = ctx.request;
    var res = ctx.response;
    //@note 设置响应头类型 
    ctx.set('Content-Type', 'text/css');
    var base = _path2.default.join(__dirname, '../../');
    var p = req.path.split('/').slice(1).join('/');
    var mpath = base + p;
    //less文件不存在 404
    if (!_fs2.default.existsSync(mpath)) {
      var err = new Error('Not Found');
      err.status = 404;
      res.status = err.status || 500;
      ctx.body = err.message;
      return;
    }
    var contentText = _fs2.default.readFileSync(mpath);
    less.render(contentText.toString(), {
      filename: mpath
    }, function (e, output) {
      if (e) {
        ctx.body = self.showError(e);
      } else {
        ctx.body = output.css;
      }
    });
  }
};
exports.handleJs = {
  showError: function showError(content) {
    return ["var div = document.createElement('div') ;", 'div.innerHTML = "' + content.replace(/\\/g, '\/').replace(/\n/g, '<br/><br/>') + '";', "div.style.width = '14rem';div.style.backgroundColor = '#000' ;", "div.style.padding = '5px 5px 5px 15px' ; div.style.margin = '0 auto' ;", "div.style.left = '0' ;div.style.right = '0' ;", "div.style.position = 'fixed' ; div.style.borderRadius = '3px' ;", "div.style.boxShadow = '0 0 1rem rgba(0,0,0,.3)' ;div.style.top='5rem';", "div.style.fontSize = '.6rem' ;div.style.color = '#fff' ;div.style.zIndex = '999' ;", "div.style.wordBreak = 'break-word' ;", "document.querySelector('body').appendChild(div);"].join('');
  },

  do: function _do(ctx) {
    var self = this;
    var req = ctx.request;
    var res = ctx.response;
    //@note 设置响应头类型 
    ctx.set('Content-Type', 'application/javascript');
    var base = _path2.default.join(__dirname, '../../');
    var p = req.path.split('/').slice(1).join('/');
    var mpath = base + p;
    //less文件不存在 404
    if (!_fs2.default.existsSync(mpath)) {
      var err = new Error('Not Found');
      err.status = 404;
      res.status = err.status || 500;
      ctx.body = err.message;
      return;
    }
    var b = browserify({
      entries: mpath,
      debug: true
    }).bundle();
    b.on('error', console.error);
    ctx.body = b;
  }
};