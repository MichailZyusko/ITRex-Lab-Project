import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Возвращает пациента по его user_id
 *
 * @param {string} user_id - UUID пользователя
 * @returns {Promise<*>}
 */

export default async (user_id) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `SELECT *
  FROM patients
  JOIN credentials
  ON patients.user_id = credentials.user_id
  AND credentials.user_id = '${user_id}'`;

  try {
    const [[result]] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
