import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async (patientID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `SELECT * 
  FROM medical_cards 
  JOIN resolutions 
  ON medical_cards.medical_card_id = resolutions.medical_card_id 
  WHERE patient_id = '${patientID}'`;

  try {
    const [result] = await connection.query(query);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
