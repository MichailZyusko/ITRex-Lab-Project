import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('allQueue', {
  doctorID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  queueID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
