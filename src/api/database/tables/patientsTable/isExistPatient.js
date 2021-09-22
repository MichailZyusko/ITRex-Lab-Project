import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Проверяет на существование пациента с такими данными
 *
 * @param {string} firstName - имя пациента
 * @param {string} lastName - фамилия пациента
 * @param {Date} birthday - день рождения пациента
 * @param {string} gender - гендер пациента
 * @returns {Promise<number>}
 */

export default async ({
  firstName, lastName, birthday, gender,
}) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `
    SELECT * 
    FROM patients 
    WHERE first_name = '${firstName}' 
    AND last_name = '${lastName}'
#     AND birthday = '${birthday}'
    AND gender = '${gender}'
  `;

  try {
    const [result] = await connection.query(query);

    return result.length;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
