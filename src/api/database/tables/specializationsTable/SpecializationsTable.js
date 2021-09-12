/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import getAllSpecializations from './index.js';

class SpecializationTable {
  async getAllSpecializations() {
    return await getAllSpecializations();
  }
}

export default new SpecializationTable();
