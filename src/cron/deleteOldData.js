import mysql from 'mysql2';
import config from '../../config.js';
import resolutionStatus from '../api/database/tables/resolutionStatus.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();
  const now = Date.now();

  const query = `SELECT *
  FROM resolutions
  WHERE status = 'relevant'`;

  try {
    const [result] = await connection.query(query);

    result
      .filter((item) => now >= Date.parse(item.TTL))
      .forEach(async (item) => {
        const updateQuery = `
        UPDATE resolutions
        SET status = '${resolutionStatus.outdate}'
        WHERE resolution_id = '${item.resolution_id}'
        `;
        await connection.query(updateQuery);
      });
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
