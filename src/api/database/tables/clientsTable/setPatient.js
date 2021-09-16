import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async ({
  firstName, lastName, birthday, gender, email, patientID,
}) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = 'INSERT INTO patients SET ?';

  try {
    const [result] = await connection.query(query, {
      id: patientID,
      first_name: firstName,
      last_name: lastName,
      birthday,
      gender,
      email,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
