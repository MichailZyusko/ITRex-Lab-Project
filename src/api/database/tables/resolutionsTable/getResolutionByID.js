import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Получает резолюцию с id:resolutionID
 *
 * @param {string} resolutionID - UUID резолюции
 * @returns {Promise<*>}
 */

export default async (resolutionID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `SELECT *
  FROM resolutions
  WHERE resolution_id = '${resolutionID}'`;

  try {
    const [[result]] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
