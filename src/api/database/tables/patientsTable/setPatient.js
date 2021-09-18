import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async ({
  firstName, lastName, birthday, gender, email, patientID, userID,
}) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
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
      user_id: userID,
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
