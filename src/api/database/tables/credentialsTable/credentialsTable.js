/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { addUser, findByLogin, findDoctorByLogin } from './index.js';

class PasswordsTable {
  async addUser({ email, patientID, password }) {
    return await addUser(email, patientID, password);
  }

  async findByLogin(login) {
    return await findByLogin(login);
  }

  async findDoctorByLogin(login) {
    return await findDoctorByLogin(login);
  }
}

export default new PasswordsTable();
