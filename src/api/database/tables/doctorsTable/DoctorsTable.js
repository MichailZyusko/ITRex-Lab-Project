/* eslint-disable class-methods-use-this */

import { addDoctor, findSpecialization } from './index.js';

class DoctorsTable {
  async addDoctor(doctor) {
    await addDoctor(doctor);
  }

  async findSpecialization(userID) {
    return await findSpecialization(userID);
  }
}

export default new DoctorsTable();
