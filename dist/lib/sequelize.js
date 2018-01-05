'use strict';

var _config = require('../config');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(_config.DB.database, _config.DB.username, _config.DB.password, {
    host: _config.DB.host,
    dialect: _config.System.db_type,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
exports.sequelize = sequelize;