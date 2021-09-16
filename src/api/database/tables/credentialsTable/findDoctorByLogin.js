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

  const query = `SELECT credentials.password, credentials.userID FROM credentials
                    INNER JOIN doctors ON
                    doctors.userID=credentials.userID AND
                    credentials.login= '${login}'`;

  try {
    const result = await connection.query(query);
    return result[0][0];
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
