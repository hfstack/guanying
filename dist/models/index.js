'use strict';

var _require = require('../lib/sequelize'),
    sequelize = _require.sequelize;

var Movie = sequelize.import("./movie");
var TvList = sequelize.import("./tvList");
var Tv = sequelize.import("./tv");

TvList.hasMany(Tv);
Tv.belongsTo(TvList);

// 同步模型到数据库中
// sequelize.sync();
sequelize.sync({ force: false });
module.exports = {
  Movie: Movie,
  TvList: TvList,
  Tv: Tv
};