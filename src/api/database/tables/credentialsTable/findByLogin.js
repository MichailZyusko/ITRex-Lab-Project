import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async (login) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();
  const query = `SELECT * FROM credentials WHERE login = '${login}'`;

  try {
    const [[result]] = await connection.query(query, login);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
