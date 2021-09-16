import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (email, patientID, userPassword) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = 'INSERT INTO credentials SET ?';

  try {
    const [result] = await connection.query(query, {
      login: email,
      user_id: patientID,
      password: await bcrypt.hashSync(userPassword, 10),
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
