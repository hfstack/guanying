'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendemail = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {}
// console.log('ok')


// 发送Email（目前使用的是阿里云SMTP发送邮件）
// receivers 目标邮箱，可以用英文逗号分隔多个。（我没试过）
// subject 邮件标题
// text 文本版本的邮件内容
// html HTML版本的邮件内容
// 返回
// result 200是成功，500是失败
// info 是返回的消息，可能是结果的文本，也可能是对象。（这个错误不要暴露给用户）
;

var sendemail = exports.sendemail = function sendemail(receivers, subject, text, html) {
  return new _promise2.default(function (resolve) {
    var transporter = _nodemailer2.default.createTransport('smtp://' + _config.SendEmail.username + ':' + _config.SendEmail.password + '@' + _config.SendEmail.service);

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: _config.SendEmail.sender_address, // sender address
      to: receivers,
      subject: subject,
      text: text || 'Hello world 🐴', // plaintext body
      html: html || '<b>Hello world 🐴</b>' // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve({
          result: 500,
          info: error
        });
      } else {
        resolve({
          result: 200,
          info: info.response
        });
      }
    });
  });
};