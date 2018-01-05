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
    (function ($, window) {
      var movieList = [];
      var tvList = [];
      var isSearch = false;
      var Search = {
        init: function init() {
          var self = this;
          self.eventHandler();
        },
        eventHandler: function eventHandler() {
          $(document).on('click', '#doplayers', function () {
            var searchValue = $('#url').val();
            if (searchValue.match('//')) {
              window.location.href = '/page/play/index?url=' + searchValue;
            } else {
              $.ajax({
                url: '/api/search?value=' + searchValue,
                dataType: 'json',
                beforeSend: function beforeSend() {
                  isSearch = true;
                  $('.fa-search').hide();
                  $('.fa-spinner').show();
                },
                success: function success(res) {
                  $('.fa-search').show();
                  $('.fa-spinner').hide();
                  isSearch = false;
                  movieList = res.data.movie ? res.data.movie : [];
                  tvList = res.data.tv ? res.data.tv : [];
                }
              });
            }
          });
        }

      };
      Search.init();
    })(jQuery, window);
  }, {}] }, {}, [1]);