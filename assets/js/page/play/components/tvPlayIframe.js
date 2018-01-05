(function(window, $) {
  var baseUrl = 'http://000o.cc/jx/ty.php?url=';
  var videoUrl = $('#vplay').attr('data-src');
  var playUrl = '';
  var $vplay = $('#vplay')
  var Tv = {
    init: function() {
      var self = this;
      console.log($('.api:first'))
      self.changePort()
      self.videoPlay()
    },
    videoPlay: function() {
      $('.api:first').trigger('click')
    },
    changePort: function() {
      $(document).on('click', '.api', function() {
        var me = $(this);
        var uid = me.find('input').attr('id')
        if(+uid === 1) {
          baseUrl = 'http://000o.cc/jx/ty.php?url='
        } else if(+uid === 2) {
          baseUrl = 'https://api.vparse.org/?url='
        } else if (+uid === 3) {
          baseUrl = 'http://65yw.2m.vc/chaojikan.php?url='
        } else if (+uid === 4) {
          baseUrl = 'http://www.vipjiexi.com/tong.php?url='
        }
        $vplay.attr('src', baseUrl + videoUrl);
        $('.api').each(function() {
          $(this).removeClass('active')
        })
        me.addClass('active')
      })
    },
  }
  Tv.init();
})(window, jQuery)