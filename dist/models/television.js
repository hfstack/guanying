'use strict';

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var STRING = sequelize.STRING,
      TEXT = sequelize.TEXT;

  var Television = sequelize.define('television', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(60),
      allowNull: false
    },
    content: {
      type: TEXT,
      allowNull: true
    },
    img: {
      type: STRING(255),
      allowNull: true
    },
    urls: {
      type: TEXT,
      allowNull: false
    }
  }, {
    tableName: 'television'
  });
  Television.associate = function () {};
  return Television;
};