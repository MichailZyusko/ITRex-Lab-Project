import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (resolutionID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
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
