"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (window, $) {
      var baseUrl = 'http://000o.cc/jx/ty.php?url=';
      var videoUrl = $('#vplay').attr('data-src');
      var playUrl = '';
      var $vplay = $('#vplay');
      var Tv = {
        init: function init() {
          var self = this;
          console.log($('.api:first'));
          self.changePort();
          self.videoPlay();
        },
        videoPlay: function videoPlay() {
          $('.api:first').trigger('click');
        },
        changePort: function changePort() {
          $(document).on('click', '.api', function () {
            var me = $(this);
            var uid = me.find('input').attr('id');
            if (+uid === 1) {
              baseUrl = 'http://000o.cc/jx/ty.php?url=';
            } else if (+uid === 2) {
              baseUrl = 'https://api.vparse.org/?url=';
            } else if (+uid === 3) {
              baseUrl = 'http://65yw.2m.vc/chaojikan.php?url=';
            } else if (+uid === 4) {
              baseUrl = 'http://www.vipjiexi.com/tong.php?url=';
            }
            $vplay.attr('src', baseUrl + videoUrl);
            $('.api').each(function () {
              $(this).removeClass('active');
            });
            me.addClass('active');
          });
        }
      };
      Tv.init();
    })(window, jQuery);
  }, {}] }, {}, [1]);