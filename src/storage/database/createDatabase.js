import mysql from 'mysql2';
import config from '../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Функция создает базу данных с именем ${database}
 *
 * */

export default async () => {
  const connection = mysql.createConnection({
    host, port, user, password,
  }).promise();
  const query = `CREATE DATABASE IF NOT EXISTS ${database}`;

  try {
    await connection.query(query);
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
};
