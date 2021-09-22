import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Получаем все специализации докторов
 *
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'SELECT * FROM specializations';

  try {
    const [result] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
