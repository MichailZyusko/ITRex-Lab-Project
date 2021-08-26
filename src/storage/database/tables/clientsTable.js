import pkg from 'sequelize';
import sequelize from '../index.js';

const { DataTypes } = pkg;

export default sequelize.define('client', {
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
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
