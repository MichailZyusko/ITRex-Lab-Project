import clientsTable from '../../../../../storage/database/tables/clientsTable.js';

export default async (client, clientID) => {
  try {
    client.clientID = clientID;
    await clientsTable.create(client);
  } catch (error) {
    console.log(error);
  }
};
