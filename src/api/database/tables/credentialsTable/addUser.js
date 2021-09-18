import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

export default async ({ email, userID, password: userPassword }) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  }).promise();

  const query = 'INSERT INTO credentials SET ?';

  try {
    const [result] = await connection.query(query, {
      login: email,
      user_id: userID,
      password: await bcrypt.hashSync(userPassword, 10),
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
