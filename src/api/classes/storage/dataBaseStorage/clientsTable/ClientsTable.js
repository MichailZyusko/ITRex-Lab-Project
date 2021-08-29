/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import {
  setClient, getClient, delClient, hasClient, getClients,
} from './index.js';

class ClientsTable {
  async setClient(client, clientID) {
    return await setClient(client, clientID);
  }

  async getClient(key) {
    return await getClient(key);
  }

  async delClient(key) {
    return await delClient(key);
  }

  async hasClient(key) {
    return await hasClient(key);
  }

  async getClients() {
    return await getClients();
  }
}

export default new ClientsTable();
