import mysql from 'mysql2';
import config from '../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Функция создает таблицу пациентов с полями
 * @field {CHAR(36)} user_id - UUID пользователя
 * @field {VARCHAR(255)} password - пароль пользователя
 * @field {VARCHAR(255)} login - логин пользователя
 * */

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const sqlQuery = `CREATE TABLE IF NOT EXISTS credentials (
    user_id CHAR(36),
    password VARCHAR(255),
    login VARCHAR(255),
    PRIMARY KEY (user_id),
    INDEX index_id(user_id)
  )`;

  try {
    await connection.query(sqlQuery);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
