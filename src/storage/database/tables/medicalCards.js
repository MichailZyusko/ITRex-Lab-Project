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

  const sqlQuery = `CREATE TABLE IF NOT EXISTS medical_cards (
    patient_id VARCHAR(255),
    medical_card_id VARCHAR(255)
#     FOREIGN KEY (patient_id) REFERENCES patients(id)                                     
#     user_id VARCHAR(255),
#     PRIMARY KEY (id),

  )`;

  try {
    await connection.query(sqlQuery);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
