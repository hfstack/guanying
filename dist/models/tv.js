'use strict';

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var STRING = DataTypes.STRING;

  return sequelize.define('tv', {
    url: {
      type: STRING(255),
      unique: true,
      allowNull: true
    },
    content: {
      type: STRING(22),
      allowNull: true
    },
    title: {
      type: STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tv'
  });
};