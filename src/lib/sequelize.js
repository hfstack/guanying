const Sequelize = require('sequelize');
import { DB as DBConfig, System as SystemConfig } from '../config'
const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    host: DBConfig.host,
    dialect: SystemConfig.db_type,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
exports.sequelize = sequelize;
