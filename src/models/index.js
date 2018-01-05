'use strict';
var { sequelize } = require('../lib/sequelize')
const Movie = sequelize.import("./movie");
const TvList = sequelize.import("./tvList");
const Tv = sequelize.import("./tv");

TvList.hasMany(Tv);
Tv.belongsTo(TvList);

// 同步模型到数据库中
// sequelize.sync();
sequelize.sync({ force: false });
module.exports = {
  Movie,
  TvList,
  Tv
}
