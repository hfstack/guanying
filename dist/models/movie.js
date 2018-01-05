'use strict';

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var STRING = DataTypes.STRING,
      BOOLEAN = DataTypes.BOOLEAN;

  return sequelize.define('movie', {
    name: {
      type: STRING(255),
      allowNull: false
    },
    imgUrl: {
      type: STRING(255),
      allowNull: true
    },
    url: {
      type: STRING(255),
      allowNull: true
    },
    desc: {
      type: STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'movie'
  });
};