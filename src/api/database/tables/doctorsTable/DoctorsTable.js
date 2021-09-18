import { findSpecialization, getDoctorByUserID, getDoctorsBySpecID, getDoctorByID } from './index.js';

class DoctorsTable {
  constructor() {
    this.findSpecialization = findSpecialization;
    this.getDoctorByUserID = getDoctorByUserID;
    this.getDoctorsBySpecID = getDoctorsBySpecID;
    this.getDoctorByID = getDoctorByID;
  }
}

export default new DoctorsTable();
