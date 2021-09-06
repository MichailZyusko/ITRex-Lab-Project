/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { addUser, findByLogin } from './index.js';

class PasswordsTable {
  async addUser({ email, patientID, password }) {
    return await addUser(email, patientID, password);
  }

  async findByLogin(login) {
    return await findByLogin(login);
  }
}

export default new PasswordsTable();
