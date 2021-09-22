import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Возвращает доктора по его user_id:userID
 *
 * @param {string} userID - UUID пользователя
 * @returns {Promise<*>}
 */

export default async (userID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `
    SELECT * 
    FROM doctors
    WHERE user_id = '${userID}';`;

  try {
    const [[result]] = await connection.query(query);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
