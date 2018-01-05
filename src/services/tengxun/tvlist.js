const TvList = require('../../models').TvList
const Tv = require('../../models').Tv
const createTv = async function (data) { 
  await TvList.create({
    imgUrl: data.imgUrl,
    name: data.name,
    desc: data.desc,
    url: data.url,
    nums: data.num,
    score: data.score,
    roles: data.roles
  });
  return true; // 返回数据
};
const getTvUrl = async function(data) {
  const page = parseInt(data.page) || 0;
  const page_size = parseInt(data.page_size) || 1;
  const tvLists = await TvList.findAll({
    offset: page * page_size,
    limit: page_size,
    attributes: [ 'id', 'url']
  })
  return JSON.parse(JSON.stringify(tvLists))
}
const createTvDetail = async function(data) {
  await Tv.create({
    url: data.url,
    content: data.content,
    title: data.title,
    tvListId: data.tvListId
  });
  return true; // 返回数据
}
module.exports = {
  createTv,
  getTvUrl,
  createTvDetail
}