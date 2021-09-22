import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Создает медицинскую карточку пациенту с patient_id
 *
 * @param {string} patient_id - UUID пациента
 * @param {string} medical_card_id - UUID медицинской карты
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async (patient_id, medical_card_id) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'INSERT INTO medical_cards SET ?';

  try {
    const [result] = await connection.query(query, {
      patient_id,
      medical_card_id,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
