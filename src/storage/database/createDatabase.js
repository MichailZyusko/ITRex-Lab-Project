import mysql from 'mysql2';
import config from '../../../config.js';

const {
  database: {
    port, host, user, databaseName,
  },
} = config;

export default async () => {
  const connection = mysql.createConnection({ host, port, user }).promise();

  const query = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
  try {
    await connection.query(query);
  } catch (error) {
    console.log(error);
  }
};
