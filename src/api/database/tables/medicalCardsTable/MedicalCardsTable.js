import { addRecord, getAllRecords, getMedicalCardByID } from './index.js';

class MedicalCardsTable {
  constructor() {
    this.addRecord = addRecord;
    this.getAllRecords = getAllRecords;
    this.getMedicalCardByID = getMedicalCardByID;
  }
}

export default new MedicalCardsTable();
