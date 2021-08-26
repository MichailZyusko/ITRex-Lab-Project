/* eslint-disable class-methods-use-this */

import { addDoctor } from './index.js';

class DoctorsTable {
  async addDoctor(doctor) {
    await addDoctor(doctor);
  }
}

export default new DoctorsTable();
