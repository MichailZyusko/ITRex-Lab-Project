import { Sequelize } from 'sequelize';
import config from '../../../config.js';

const {
  database: {
    host, user, databaseName, dialect, password,
  },
} = config;

export default new Sequelize(databaseName, user, password, {
  host,
  dialect,
  logging: false,
});
