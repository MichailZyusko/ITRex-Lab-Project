import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (login) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();
  const query = `
    SELECT credentials.password, credentials.user_id
    FROM credentials
    INNER JOIN doctors ON
    doctors.user_id = credentials.user_id
    WHERE
    credentials.login= '${login}'`;

  try {
    const [[result]] = await connection.query(query);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
