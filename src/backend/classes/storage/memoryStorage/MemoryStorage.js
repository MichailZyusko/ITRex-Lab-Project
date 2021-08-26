/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

export default class {
  constructor() {
    this.clients = new Map();
    this.resolutions = new Map();
  }

  getResolutions() {
    return Array.from(this.resolutions.values());
  }

  // TTL(clientID, map) {
  //   this.resolutions.set(clientID, map);
  // }

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

    const { clientID } = clients[0];

    return this.resolutions.get(clientID);
  }

  // TODO Вынести общий код из get и delete
  delete(searchingString) {
    const clients = Array
      .from(this.clients.values())
      .filter((item) => item.firstName === searchingString);

    const { clientID } = clients[0];
    const resolutionArray = this.resolutions.get(clientID);
    resolutionArray.pop();
    resolutionArray.push({ diagnose: null, TTL: null });

    return this.resolutions.set(clientID, resolutionArray);
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
    if (this.resolutions.has(clientID)) {
      const arr = this.resolutions.get(clientID);
      arr.push({ diagnose, TTL });
      return this.resolutions.set(clientID, arr);
    }

    return this.resolutions.set(clientID, [{ diagnose, TTL }]);
  }

  has(searchingString) {
    const clients = Array
      .from(this.clients.values())
      .filter((item) => item.firstName === searchingString);

    const { clientID } = clients[0];

    return this.clients.has(clientID);
  }
}
