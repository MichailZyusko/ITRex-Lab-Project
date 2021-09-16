import mysql from 'mysql2';
import config from '../../../../config.js';

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

  const sqlQuery = `CREATE TABLE IF NOT EXISTS credentials (
    user_id VARCHAR(255),
    password VARCHAR(255),
    login VARCHAR(255),
    PRIMARY KEY (user_id)
                                       
#     user_id VARCHAR(255),
#     FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

  try {
    await connection.query(sqlQuery);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
