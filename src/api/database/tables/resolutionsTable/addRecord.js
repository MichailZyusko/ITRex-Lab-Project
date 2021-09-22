import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Добавляет резолюцию в таблицу
 *
 * @param {string} resolution_id - UUID резолюции
 * @param {string} medical_card_id - UUID медицинской карты
 * @param {string} doctor_id - UUID доктора
 * @param {string} resolution - Текст резолюции
 * @param {Date} comingDate - дата, когда доктор поставил резолюцию
 * @param {Date} TTL - Time To Life резолюции
 * @param {string} name - полное имя доктора, который поставил резолюцию
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async (
  resolution_id, medical_card_id,
  doctor_id, resolution, comingDate, TTL, name,
) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'INSERT INTO resolutions SET ?';

  try {
    const [result] = await connection.query(query, {
      resolution_id,
      medical_card_id,
      doctor_specialization: doctor_id,
      doctor_full_name: name,
      resolution_text: resolution,
      date: comingDate,
      status: 'relevant',
      TTL,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
