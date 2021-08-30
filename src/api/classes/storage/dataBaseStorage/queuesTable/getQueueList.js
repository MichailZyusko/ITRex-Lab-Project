// import queuesTable from '../../../../../storage/database/tables/queuesTable.js';
// import clientsTable from '../../../../../storage/database/tables/clientsTable.js';

// export default async () => {
//   try {
//     queuesTable.belongsTo(clientsTable);
//     const result = await queuesTable.findAll({ where: { status: 'false' } });

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

import mysql from 'mysql2';
import config from '../../../../../../config.js';

const {
  database: {
    port, host, user, databaseName, password,
  },
} = config;

export default async () => {
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database: databaseName,
  }).promise();

  const query = `SELECT * FROM clients
  JOIN queues ON clients.clientID = queues.clientID
  WHERE queues.status = false`;

  try {
    const [result] = await connection.query(query);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};
