import getAllSpecializations from './index.js';

class SpecializationTable {
  constructor() {
    this.getAllSpecializations = getAllSpecializations;
  }
}

export default new SpecializationTable();
