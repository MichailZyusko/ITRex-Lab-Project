/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import ClientsTable from './tables/clientsTable/ClientsTable.js';
import CredentialsTable from './tables/credentialsTable/credentialsTable.js';
import MedicalCardsTable from './tables/medicalCardsTable/MedicalCardsTable.js';
import ResolutionsTable from './tables/resolutionsTable/ResolutionsTable.js';

import createDatabase from '../../storage/database/createDatabase.js';
import sequelize from '../../storage/database/index.js';
import config from '../../../config.js';
import ApiError from '../../errors/ApiError.js';

(async () => {
  try {
    await createDatabase();
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
})();

const { secretKey } = config;

class DatabaseStorage {
  async setPatient(patient) {
    patient.patientID = uuidv4();
    await ClientsTable.setPatient(patient);
    await CredentialsTable.addUser(patient);

    return 'OK';
  }

  async findByLogin(password, login) {
    const record = await CredentialsTable.findByLogin(login);

    if (!record) {
      throw new ApiError(403, 'Wrong password or login');
    }

    const { userID, password: passwordFromDB } = record;

    if (passwordFromDB !== password) {
      throw new ApiError(403, 'Wrong password or login');
    }

    const token = jwt.sign({ id: userID }, secretKey);

    return { token };
  }

  async getPatientByID(ID) {
    return await ClientsTable.getPatientByID(ID);
  }

  async setDiagnose(ID, doctorID, diagnose, comingDate, TTL) {
    const medicalCardID = uuidv4();
    const resolutionID = uuidv4();
    await MedicalCardsTable.addRecord(ID, medicalCardID);
    return await ResolutionsTable.addRecord(resolutionID, medicalCardID,
      doctorID, diagnose, comingDate, TTL);
  }

  async getAllResolutionsByID(patientID) {
    return await MedicalCardsTable.getAllRecords(patientID);
  }

  async isExistPatient(patient) {
    return await ClientsTable.isExistPatient(patient);
  }

  async getAllPatientLikeValue(text) {
    return await ClientsTable.getAllPatientLikeValue(text);
  }

  async getResolutionByID(resolutionID) {
    return await ResolutionsTable.getResolutionByID(resolutionID);
  }

  async deleteResolutionByID(resolutionID) {
    return await ResolutionsTable.deleteResolutionByID(resolutionID);
  }
}

export default new DatabaseStorage();
