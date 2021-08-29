/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

export default class {
  constructor() {
    this.clients = new Map();
    this.resolutions = new Map();
  }

  set(client) {
    client.status = false;
    this.clients.set(client.clientID, client);
    return 'OK';
  }

  // TODO Вынести общий код из get и delete
  get(searchingString) {
    const clients = Array
      .from(this.clients.values())
      .filter((item) => item.firstName === searchingString);

    if (clients.length) {
      const { clientID } = clients[0];

      return this.resolutions.get(clientID);
    }
    return false;
  }

  // TODO Вынести общий код из get и delete
  delete(searchingString) {
    const clients = Array
      .from(this.clients.values())
      .filter((item) => item.firstName === searchingString);

    if (clients.length) {
      const { clientID } = clients[0];
      const resolution = this.resolutions.get(clientID);
      resolution.status = 'outdate';
      this.resolutions.set(clientID, resolution);

      return true;
    }

    return false;
  }

  values() {
    return Array.from(this.clients.values())
      .filter(({ status }) => !status)
      .sort((a, b) => a.recordTime - b.recordTime);
  }

  setDiagnose(clientID, diagnose, TTL) {
    const client = this.clients.get(clientID);
    client.status = true;
    this.clients.set(clientID, client);

    this.resolutions.set(clientID, {
      diagnose,
      TTL,
      status: 'relevant',
    });
  }

  has(clientID) {
    return this.clients.has(clientID);
  }
}
