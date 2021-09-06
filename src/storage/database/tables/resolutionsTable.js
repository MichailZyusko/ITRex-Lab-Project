import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('resolution', {
  resolutionID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  medicalCardID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  doctorID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  resolutionText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'relevant',
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  TTL: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // diagnose: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // treatment: {
  //   type: DataTypes.DATE,
  //   allowNull: true,
  // },
});
