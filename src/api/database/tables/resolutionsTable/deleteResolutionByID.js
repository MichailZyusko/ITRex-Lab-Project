import mysql from 'mysql2';
import config from '../../../../../config.js';
import resolutionStatus from '../resolutionStatus.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

/**
 * Удаляет резолюцию с id:resolutionID
 *
 * @param {string} resolutionID - UUID резолюции
 * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
 */

export default async (resolutionID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `UPDATE resolutions
  SET status = '${resolutionStatus.deleted}'
  WHERE resolution_id = '${resolutionID}'`;

  try {
    const [result] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
