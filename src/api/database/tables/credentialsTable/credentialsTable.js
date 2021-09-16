import { addUser, findByLogin, findDoctorByLogin } from './index.js';

class CredentialsTable {
  constructor() {
    this.addUser = addUser;
    this.findByLogin = findByLogin;
    this.findDoctorByLogin = findDoctorByLogin;
  }
}

export default new CredentialsTable();
