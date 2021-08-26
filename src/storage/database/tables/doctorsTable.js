import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('doctor', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullAge: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctorID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
