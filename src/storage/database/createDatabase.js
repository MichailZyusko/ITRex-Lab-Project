import mysql from 'mysql2';
import config from '../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async () => {
  const connection = mysql.createConnection({
    host, port, user, password,
  }).promise();
  const query = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

  try {
    // await connection.query('DROP DATABASE queuedb');
    await connection.query(query);
    return true;
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};
