"use strict";

/**
 * 睡眠模拟函数
 * @param  {Number} numberMillis 毫秒
 */
exports.sleep = function (numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime) return;
  }
};