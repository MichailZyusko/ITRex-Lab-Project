import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async (doctorID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = `
    SELECT *
    FROM specializations
    JOIN doctor_specialization ON
    specializations.specialization_id=doctor_specialization.specialization_id
    JOIN doctors ON
    doctors.doctor_id = doctor_specialization.doctor_id AND
    doctors.doctor_id = '${doctorID}'`;

  try {
    const [[result]] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
