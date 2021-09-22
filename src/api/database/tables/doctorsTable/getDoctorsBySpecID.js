import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Возвращает доктора по его specification_id:specID
 *
 * @param {string} specID - UUID специализации
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async (specID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `SELECT *
  FROM doctors
  JOIN doctor_specialization
  ON doctor_specialization.doctor_id = doctors.doctor_id
  WHERE specialization_id = '${specID}'`;

  try {
    const [result] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
