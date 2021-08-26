import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('medicalCard', {
  clientID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  doctorID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  comingDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  diagnose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TTL: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
