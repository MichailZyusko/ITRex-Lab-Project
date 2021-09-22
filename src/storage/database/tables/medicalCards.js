import mysql from 'mysql2';
import config from '../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Функция создает таблицу медицинских карточек с полями
 * @field {CHAR(36)} patient_id - UUID пациента
 * @field {CHAR(36)} medical_card_id - UUID медицинской карты
 * */

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const sqlQuery = `CREATE TABLE IF NOT EXISTS medical_cards (
    patient_id CHAR(36),
    medical_card_id CHAR(36),
    INDEX index_id(patient_id),
    INDEX med_card(medical_card_id)
  )`;

  try {
    await connection.query(sqlQuery);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
