import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Создает пользователя с login:email и password:userPassword
 *
 * @param {string} email - логин пользователя
 * @param {string} userID - UUID пользователя
 * @param {string} userPassword - пароль пользователя
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async ({ email, userID, password: userPassword }) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'INSERT INTO credentials SET ?';

  try {
    const [result] = await connection.query(query, {
      login: email,
      user_id: userID,
      password: await bcrypt.hashSync(userPassword, 10),
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
