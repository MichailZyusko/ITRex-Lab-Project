import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (patient_id, medical_card_id) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = 'INSERT INTO medical_cards SET ?';

  try {
    const [result] = await connection.query(query, {
      patient_id,
      medical_card_id,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
