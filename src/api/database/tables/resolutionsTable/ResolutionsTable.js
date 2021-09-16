import { addRecord, getResolutionByID, deleteResolutionByID } from './index.js';

class ResolutionsTable {
  constructor() {
    this.getResolutionByID = getResolutionByID;
    this.addRecord = addRecord;
    this.deleteResolutionByID = deleteResolutionByID;
  }
}

export default new ResolutionsTable();
