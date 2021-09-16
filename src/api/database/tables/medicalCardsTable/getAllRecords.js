// import medicalCardsTable from '../../../../storage/database/tables/medicalCardsTable.js';

// export default async (key) => {
//   try {
//     const resolutions = await medicalCardsTable.findAll({ where: { clientID: `${key}` } });

//     return resolutions;
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
  FROM medical_cards 
  JOIN resolutions 
  ON medical_cards.medicalCardID = resolutions.medicalCardID 
  WHERE patientID = '${patientID}'`;

  try {
    const [result] = await connection.query(query);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
