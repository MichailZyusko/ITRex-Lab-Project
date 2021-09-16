import { findSpecialization, getDoctor } from './index.js';

class DoctorsTable {
  constructor() {
    this.findSpecialization = findSpecialization;
    this.getDoctor = getDoctor;
  }
}

export default new DoctorsTable();
