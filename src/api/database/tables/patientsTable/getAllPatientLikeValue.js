import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Возвращает всех пациентов у которых в имени или фамилии или в email содержится text
 *
 * @param {string} text - текст для полнотекстового поиска
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async (text) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `SELECT *
  FROM patients
  WHERE first_name LIKE '%${text}%'
  OR last_name LIKE '%${text}%'
  OR email LIKE '%${text}%'`;

  try {
    const [result] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
