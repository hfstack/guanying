/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const { STRING, BOOLEAN, INTE } = DataTypes
  return sequelize.define('tv_list', {
    name: {
      type: STRING(60),
      allowNull: false
    },
    imgUrl: {
      type: STRING(255),
      allowNull: true
    },
    url: {
      type: STRING(255),
      unique: true,
      allowNull: true
    },
    desc: {
      type: STRING(255),
      allowNull: true
    },
    nums: {
      type: STRING(20),
      allowNull: true
    },
    score: {
      type: STRING(20),
      allowNull: true
    },
    roles: {
      type: STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tv_list'
  })
}
