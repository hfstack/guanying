(function($, window){
  var movieList = []
  var tvList = []
  var isSearch = false
  var Search = {
    init: function() {
      var self = this
      self.eventHandler()
    },
    eventHandler: function() {
      $(document).on('click', '#doplayers', function() {
        var searchValue = $('#url').val()
        if(searchValue.match('//')) {
          window.location.href = '/page/play/index?url=' + searchValue
        } else {
          $.ajax({
            url: '/api/search?value=' + searchValue,
            dataType: 'json',
            beforeSend: function() {
              isSearch = true
              $('.fa-search').hide()
              $('.fa-spinner').show()
            },
            success: function(res){
              $('.fa-search').show()
              $('.fa-spinner').hide()
              isSearch = false;
              movieList = res.data.movie ? res.data.movie : []
              tvList = res.data.tv ? res.data.tv : []
            }
          })
        }
      })
    },
    
  }
  Search.init()

})(jQuery, window)