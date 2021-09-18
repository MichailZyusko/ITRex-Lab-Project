import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async (
  resolution_id, medical_card_id,
  doctor_id, diagnose, comingDate, TTL, name,
) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'INSERT INTO resolutions SET ?';

  try {
    const [result] = await connection.query(query, {
      resolution_id,
      medical_card_id,
      doctor_specialization: doctor_id,
      doctor_full_name: name,
      resolution_text: diagnose,
      date: comingDate,
      status: 'relevant',
      TTL,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
