/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ClientsTable from './tables/clientsTable/ClientsTable.js';
import CredentialsTable from './tables/credentialsTable/credentialsTable.js';
import MedicalCardsTable from './tables/medicalCardsTable/MedicalCardsTable.js';
import ResolutionsTable from './tables/resolutionsTable/ResolutionsTable.js';
import SpecializationsTable from './tables/specializationsTable/SpecializationsTable.js';
import DoctorsTable from './tables/doctorsTable/DoctorsTable.js';

import config from '../../../config.js';
import ApiError from '../../errors/ApiError.js';

const { secretKey } = config;

class DatabaseStorage {
  async setPatient(patient) {
    const patientID = uuidv4();
    await ClientsTable.setPatient({ ...patient, patientID });
    await CredentialsTable.addUser({ ...patient, patientID });
  }

  async findByLogin(password, login) {
    const record = await CredentialsTable.findByLogin(login);

    if (!record) {
      throw new ApiError(403, 'Wrong password or login');
    }

    const { user_id: id, password: passwordFromDB } = record;

    if (!await bcrypt.compareSync(password, passwordFromDB)) {
      throw new ApiError(403, 'Wrong password or login');
    }

    const token = jwt.sign({ id }, secretKey);

    return { token };
  }

  async findDoctorByLogin(password, login) {
    const record = await CredentialsTable.findDoctorByLogin(login);

    if (!record) {
      throw new ApiError(403, 'Wrong password or login');
    }

    const { user_id: id, password: passwordFromDB } = record;

    if (!await bcrypt.compareSync(password, passwordFromDB)) {
      throw new ApiError(403, 'Wrong password or login');
    }

    const { doctorID } = await DoctorsTable.getDoctor(id);

    const token = jwt.sign({ id }, secretKey);

    return { token, doctorID };
  }

  async getPatientByID(ID) {
    const patient = await ClientsTable.getPatientByID(ID);
    return patient;
  }

  async getAllSpecializations() {
    const specializations = await SpecializationsTable.getAllSpecializations();
    return specializations;
  }

  async setDiagnose(ID, doctorID, diagnose, comingDate, TTL, name) {
    const medicalCardID = uuidv4();
    const resolutionID = uuidv4();
    await MedicalCardsTable.addRecord(ID, medicalCardID);
    await ResolutionsTable.addRecord(resolutionID, medicalCardID,
      doctorID, diagnose, comingDate, TTL, name);
  }

  async getResolutionsByID(patientID) {
    const resolutions = await MedicalCardsTable.getAllRecords(patientID);
    return resolutions;
  }

  async isExistPatient(patient) {
    const bool = await ClientsTable.isExistPatient(patient);
    return bool;
  }

  async getAllPatientLikeValue(text) {
    const patients = await ClientsTable.getAllPatientLikeValue(text);
    return patients;
  }

  async getResolutionByID(resolutionID) {
    const resolution = await ResolutionsTable.getResolutionByID(resolutionID);
    return resolution;
  }

  async deleteResolutionByID(resolutionID) {
    await ResolutionsTable.deleteResolutionByID(resolutionID);
  }

  async findSpecialization(doctorID) {
    const specialization = await DoctorsTable.findSpecialization(doctorID);
    return specialization;
  }

  async getDoctor(userID) {
    const doctor = await DoctorsTable.getDoctor(userID);
    return doctor;
  }
}

export default new DatabaseStorage();
