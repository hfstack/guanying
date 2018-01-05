const Movie = require('../models').Movie
export let getMovieList = async function(data) {
  var page = data && data.page || 0;
  var pagesize = data && data.pagesize || 20;
  var MovieList = await Movie.findAll({
    offset: page * pagesize,
    limit: pagesize
  })
  return JSON.parse(JSON.stringify(MovieList))
}
