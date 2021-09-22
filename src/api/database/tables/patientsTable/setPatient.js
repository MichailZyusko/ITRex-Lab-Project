import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Создает пациента
 *
 * @param {string} firstName - имя пациента
 * @param {string} lastName - фамилия пациента
 * @param {Date} birthday - день рождения пациента
 * @param {string} gender - гендер пациента
 * @param {string} email - email пациента
 * @param {string} patientID - UUID пациента
 * @param {string} userID - UUID пользователя
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async ({
  firstName, lastName, birthday, gender, email, patientID, userID,
}) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'INSERT INTO patients SET ?';

  try {
    const [result] = await connection.query(query, {
      id: patientID,
      first_name: firstName,
      last_name: lastName,
      birthday,
      gender,
      email,
      user_id: userID,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
