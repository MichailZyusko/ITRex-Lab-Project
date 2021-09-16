import { addRecord, getAllRecords } from './index.js';

class MedicalCardsTable {
  constructor() {
    this.addRecord = addRecord;
    this.getAllRecords = getAllRecords;
  }
}

export default new MedicalCardsTable();
