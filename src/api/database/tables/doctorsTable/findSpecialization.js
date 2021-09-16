import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (doctorID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = `
    SELECT specializations.* 
    FROM specializations
    INNER JOIN doctor_specialization ON
    specializations.specialization_id=doctor_specialization.specialization_id
    INNER JOIN doctors ON
    doctors.doctor_id = doctor_specialization.doctor_id AND
    doctors.user_id = '${doctorID}';`;

  try {
    const [[result]] = await connection.query(query);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
