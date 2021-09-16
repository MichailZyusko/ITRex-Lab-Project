import controller from './controller.js';
import isExistPatientInQueue from './isExistPatientInQueue.js';
import isValidPatientData from './isValidPatientData.js';

class AddClient {
  constructor() {
    this.controller = controller;
    this.isExistPatientInQueue = isExistPatientInQueue;
    this.isValidPatientData = isValidPatientData;
  }
}

export default new AddClient();
