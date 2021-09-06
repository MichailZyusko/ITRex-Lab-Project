import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('medical_card', {
  patientID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  medicalCardID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
