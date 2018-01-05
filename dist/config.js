'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendEmail = exports.DB = exports.System = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var dbConfig = {};
if (env === 'production') {
  dbConfig = {
    host: '127.0.0.1', // 服务器地址
    port: 3306, // 数据库端口号
    username: 'root', // 数据库用户名
    password: '693033', // 数据库密码
    database: 'guanying', // 数据库名称
    prefix: 'api_' // 默认"api_"
  };
} else {
  dbConfig = {
    host: '127.0.0.1', // 服务器地址
    port: 3306, // 数据库端口号
    username: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    database: 'guanying', // 数据库名称
    prefix: 'api_' // 默认"api_"
  };
}
// 系统配置
var System = exports.System = {
  API_server_type: 'http://', // API服务器协议类型,包含"http://"或"https://"
  API_server_host: env === 'development' ? '127.0.0.1' : '47.94.218.229', // API服务器暴露的域名地址,请勿添加"http://"
  API_server_port: env === 'development' ? '18080' : '80', // API服务器监听的端口号
  HTTP_server_type: 'http://', // HTTP服务器协议类型,包含"http://"或"https://"
  HTTP_server_host: '*', // HTTP服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
  HTTP_server_port: '65534', // HTTP服务器端口号
  System_country: 'zh-cn', // 所在国家的国家代码
  System_plugin_path: _path2.default.join(__dirname, './plugins'), // 插件路径
  Session_Key: 'RESTfulAPI', // 生产环境务必随机设置一个值
  db_type: 'mysql' // 数据库类型
};

var DB = exports.DB = dbConfig;

var SendEmail = exports.SendEmail = {
  service: 'smtp.abcd.com', // SMTP服务提供商域名
  username: 'postmaster%40abcd.com', // 用户名/用户邮箱
  password: 'password', // 邮箱密码
  sender_address: '"XX平台 👥" <postmaster@abcd.com>'
};