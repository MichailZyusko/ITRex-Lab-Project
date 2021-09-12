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

  const query = `SELECT specializations.* FROM specializations
                    INNER JOIN doctor_specialization ON
                    specializations.specializationID=doctor_specialization.specializationID
                    INNER JOIN doctors ON
                    doctors.doctorID = doctor_specialization.doctorID AND
                    doctors.userID = '${doctorID}';`;

  try {
    const result = await connection.query(query);
    return result[0][0];
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
