/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import PatientsTable from './tables/patientsTable/PatientsTable.js';
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
    const userID = uuidv4();
    const medicalCardID = uuidv4();

    await MedicalCardsTable.addRecord(patientID, medicalCardID);
    await CredentialsTable.addUser({ ...patient, userID });
    await PatientsTable.setPatient({ ...patient, patientID, userID });
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

    // TODO нужно ли
    const { doctorID } = await DoctorsTable.getDoctorByUserID(id);

    const token = jwt.sign({ id }, secretKey);

    // TODO нужно ли
    return { token, doctorID };
  }

  async getPatientByID(ID) {
    const patient = await PatientsTable.getPatientByID(ID);
    return patient;
  }

  async getPatientByUserID(userID) {
    const patient = await PatientsTable.getPatientByUserID(userID);
    return patient;
  }

  async getAllSpecializations() {
    const specializations = await SpecializationsTable.getAllSpecializations();
    return specializations;
  }

  async setDiagnose(ID, doctorID, diagnose, comingDate, TTL) {
    const resolutionID = uuidv4();
    const { medical_card_id: medicalCardID } = await MedicalCardsTable.getMedicalCardByID(ID);
    const { specialization_name: specialization } = await DoctorsTable.findSpecialization(doctorID);
    const { first_name: fn, last_name: ln } = await DoctorsTable.getDoctorByID(doctorID);
    const name = `${fn} ${ln}`;

    await ResolutionsTable.addRecord(resolutionID, medicalCardID, specialization,
      diagnose, comingDate, TTL, name);
  }

  async getResolutionsByID(patientID) {
    const resolutions = await MedicalCardsTable.getAllRecords(patientID);
    return resolutions;
  }

  async isExistPatient(patient) {
    const bool = await PatientsTable.isExistPatient(patient);
    return bool;
  }

  async getAllPatientLikeValue(text) {
    const patients = await PatientsTable.getAllPatientLikeValue(text);
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

  async getDoctorsBySpecID(specID) {
    const doctors = await DoctorsTable.getDoctorsBySpecID(specID);
    return doctors;
  }

  async getDoctorByUserID(userID) {
    const doctor = await DoctorsTable.getDoctorByUserID(userID);
    return doctor;
  }
}

export default new DatabaseStorage();
