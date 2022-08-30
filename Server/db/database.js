const config = require('../config/config.js');
const SQ = require('sequelize');

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false,
  timezone: "+09:00"
});
