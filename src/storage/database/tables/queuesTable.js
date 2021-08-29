import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('queue', {
  clientID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  queueID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recordTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});
