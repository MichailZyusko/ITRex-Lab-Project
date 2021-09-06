import pkg from 'sequelize';
import sequelize from '../index.js';
import resolutionStatus from '../../../api/database/tables/resolutionStatus.js';

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
    defaultValue: resolutionStatus.relevant,
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
