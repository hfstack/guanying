const TvList = require('../models').TvList
const Movie = require('../models').Movie

const videoSearch = async function(ctx) {
  var searchValue = ctx.query.value
  var movieSearchResult = await Movie.findOne({
    where: {
      name: searchValue
    }
  })
  var tvSearchResult = await TvList.findOne({
    where: {
      name: searchValue
    }
  })
  ctx.body = {
    message: '成功',
    success: true,
    data: {
      tv: tvSearchResult,
      movie: movieSearchResult
    }
  }
}
module.exports = {
  videoSearch
}