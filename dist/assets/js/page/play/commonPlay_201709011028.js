"use strict";!function t(r,i,n){function o(a,c){if(!i[a]){if(!r[a]){var p="function"==typeof require&&require;if(!c&&p)return p(a,!0);if(e)return e(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=i[a]={exports:{}};r[a][0].call(f.exports,function(t){var i=r[a][1][t];return o(i||t)},f,f.exports,t,r,i,n)}return i[a].exports}for(var e="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(t,r,i){t("./components/playIframe")},{"./components/playIframe":2}],2:[function(t,r,i){!function(t,r){var i="http://000o.cc/jx/ty.php?url=",n=r("#vplay").attr("data-src"),o=r("#vplay");({init:function(){var t=this;console.log(r(".api:first")),t.changePort(),t.videoPlay()},videoPlay:function(){r(".api:first").trigger("click")},changePort:function(){r(document).on("click",".api",function(){var t=r(this),e=t.find("input").attr("id");1==+e?i="http://000o.cc/jx/ty.php?url=":2==+e?i="https://api.vparse.org/?url=":3==+e?i="http://65yw.2m.vc/chaojikan.php?url=":4==+e&&(i="http://www.vipjiexi.com/tong.php?url="),o.attr("src",i+n),r(".api").each(function(){r(this).removeClass("active")}),t.addClass("active")})}}).init()}(window,jQuery)},{}]},{},[1]);