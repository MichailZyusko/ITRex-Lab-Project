import mysql from 'mysql2';
import config from '../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Функция создает таблицу пациентов с полями
 * @field {CHAR(36)} id - UUID пациента
 * @field {CHAR(36)} user_id - UUID пользователя
 * @field {VARCHAR(255)} first_name - имя пациента
 * @field {VARCHAR(255)} last_name - фамилия пациента
 * @field {VARCHAR(255)} gender - гендер пациента
 * @field {VARCHAR(255)} email - email пациента
 * @field {DATE} birthday - день рождения пациента
 * */

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const sqlQuery = `CREATE TABLE IF NOT EXISTS patients (
    id CHAR(36),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(255),
    birthday DATE,
    email VARCHAR(255),
    user_id CHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES medical_cards(patient_id),
    FOREIGN KEY (user_id) REFERENCES credentials(user_id)
  )`;

  try {
    await connection.query(sqlQuery);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
