import mysql from 'mysql2';
import config from '../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const sqlQuery = `CREATE TABLE IF NOT EXISTS resolutions (
    resolution_id CHAR(36),
    medical_card_id CHAR(36),
    doctor_specialization VARCHAR(255),
    doctor_full_name VARCHAR(255),
    resolution_text VARCHAR(255),
    status VARCHAR(255),
    TTL DATETIME,
    date DATETIME,
    PRIMARY KEY (resolution_id),
    FOREIGN KEY (medical_card_id) REFERENCES medical_cards(medical_card_id)                                                                    
  )`;

  try {
    await connection.query(sqlQuery);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
