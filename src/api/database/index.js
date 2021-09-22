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
  /**
   * Добавляет пациента в базу данных
   *
   * @param {object} patient - объект пациента
   * @returns {Promise<void>}
   */
  async setPatient(patient) {
    const patientID = uuidv4();
    const userID = uuidv4();
    const medicalCardID = uuidv4();

    await MedicalCardsTable.addRecord(patientID, medicalCardID);
    await CredentialsTable.addUser({ ...patient, userID });
    await PatientsTable.setPatient({ ...patient, patientID, userID });
  }

  /**
   * Ищет пациента с password & login
   *
   * @param {string} password - пароль пациента
   * @param {string} login - логин пациента
   * @returns {Promise<{token: (*)}>}
   */
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

  /**
   * Ищет доктора с password & login
   *
   * @param {string} password - пароль доктора
   * @param {string} login - логин доктора
   * @returns {Promise<{token: (*)}>}
   */
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

  /**
   * Возвращает пациента с id:ID
   *
   * @param {string} ID - UUID пациента
   * @returns {Promise<*>}
   */
  async getPatientByID(ID) {
    const patient = await PatientsTable.getPatientByID(ID);
    return patient;
  }

  /**
   * Возвращает пользователя с id:userID
   *
   * @param {string} userID - UUID пользователя
   * @returns {Promise<*>}
   */
  async getPatientByUserID(userID) {
    const patient = await PatientsTable.getPatientByUserID(userID);
    return patient;
  }

  /**
   * Возвращает все специализации докторов
   *
   * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
   */
  async getAllSpecializations() {
    const specializations = await SpecializationsTable.getAllSpecializations();
    return specializations;
  }

  /**
   * Задает пациенту резолюцию
   *
   * @param {string} ID - UUID пациента
   * @param {string} doctorID - UUID доктора
   * @param {string} resolution - UUID резолюции
   * @param {Date} comingDate - дата обращения пациента
   * @param {Date} TTL - Time To Life для резолюции
   * @returns {Promise<void>}
   */
  async setDiagnose(ID, doctorID, resolution, comingDate, TTL) {
    const resolutionID = uuidv4();
    const { medical_card_id: medicalCardID } = await MedicalCardsTable.getMedicalCardByID(ID);
    const { specialization_name: specialization } = await DoctorsTable.findSpecialization(doctorID);
    const { first_name: fn, last_name: ln } = await DoctorsTable.getDoctorByID(doctorID);
    const name = `${fn} ${ln}`;

    await ResolutionsTable.addRecord(resolutionID, medicalCardID, specialization,
      resolution, comingDate, TTL, name);
  }

  /**
   * Возвращает резолюции пациента с id:patientID
   *
   * @param {string} patientID - UUID пациента
   * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
   */
  async getResolutionsByID(patientID) {
    const resolutions = await MedicalCardsTable.getAllRecords(patientID);
    return resolutions;
  }

  /**
   * Возвращает пациента если он существует
   *
   * @param {object} patient - объект пациента
   * @returns {Promise<*>}
   */
  async isExistPatient(patient) {
    const bool = await PatientsTable.isExistPatient(patient);
    return bool;
  }

  /**
   * Возвращает всех пациентов, имеющих в своем имени или фамилии или email text
   *
   * @param {string} text - строка для поиска пациентов
   * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
   */
  async getAllPatientLikeValue(text) {
    const patients = await PatientsTable.getAllPatientLikeValue(text);
    return patients;
  }

  /**
   * Возвращает резолюцию у которой id:resolutionID
   *
   * @param {string} resolutionID - UUID резолюции
   * @returns {Promise<*>}
   */
  async getResolutionByID(resolutionID) {
    const resolution = await ResolutionsTable.getResolutionByID(resolutionID);
    return resolution;
  }

  /**
   * Удаляет резолюцию у которой id:resolutionID
   *
   * @param {string} resolutionID - UUID резолюции
   * @returns {Promise<void>}
   */
  async deleteResolutionByID(resolutionID) {
    await ResolutionsTable.deleteResolutionByID(resolutionID);
  }

  /**
   * Возвращает доктора у которого specialization_id:specID
   *
   * @param {string} specID - UUID специализации
   * @returns {Promise<RowDataPacket[][]|RowDataPacket[]|OkPacket|OkPacket[]|ResultSetHeader>}
   */
  async getDoctorsBySpecID(specID) {
    const doctors = await DoctorsTable.getDoctorsBySpecID(specID);
    return doctors;
  }

  /**
   * Возвращает доктора у которого user_id:userID
   *
   * @param {string} userID - UUID пользователя
   * @returns {Promise<*>}
   */
  async getDoctorByUserID(userID) {
    const doctor = await DoctorsTable.getDoctorByUserID(userID);
    return doctor;
  }
}

export default new DatabaseStorage();
