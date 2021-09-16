import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (userID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = `
    SELECT * 
    FROM doctors
    WHERE user_id = '${userID}';`;

  try {
    const result = await connection.query(query);
    return result[0][0];
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
