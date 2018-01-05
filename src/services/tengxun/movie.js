const Movie = require('../../models').Movie; 
const createMovie = async function (data) { 
  await Movie.create({
    imgUrl: data.imgUrl,
    name: data.name,
    desc: data.desc,
    url: data.url
  });
  return true; // 返回数据
};

module.exports = {
  createMovie
}