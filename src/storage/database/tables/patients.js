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

  const sqlQuery = `CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(255),
    birthday DATE,
    email VARCHAR(255),
    PRIMARY KEY (id)
#     FOREIGN KEY (id) REFERENCES medical_cards(patient_id)
                                    
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
