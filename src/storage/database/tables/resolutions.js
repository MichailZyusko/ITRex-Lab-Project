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

  const sqlQuery = `CREATE TABLE IF NOT EXISTS resolutions (
    resolution_id VARCHAR(255),
    medical_card_id VARCHAR(255),
    doctor_specialization VARCHAR(255),
    doctor_full_name VARCHAR(255),
    resolution_text VARCHAR(255),
    status VARCHAR(255),
    TTL DATETIME,
    date DATETIME,
    PRIMARY KEY (resolution_id)
                                                                         
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
