// import clientsTable from '../../../../storage/database/tables/clientsTable.js';

// export default async (ID) => {
//   try {
//     const patient = await clientsTable.findOne({ where: { patientID: `${ID}` } });

//     return patient;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

import mysql from 'mysql2';
import config from '../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async (patientID) => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = `SELECT *
  FROM clients
  JOIN credentials
  ON patientID = userID
  WHERE patientID = '${patientID}'`;

  try {
    const [[result]] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
