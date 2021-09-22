import searchInputServices from './services.js';

const search = document.getElementById('search');
const patients = document.getElementById('patients');

/**
 * Добавляет тег option к datalist с id:patients
 *
 * @param {object} patient - пациент
 */

const addOption = (patient) => {
  const option = document.createElement('option');
  const {
    first_name: firstName, last_name: lastName, email, id,
  } = patient;

  option.value = email;
  option.label = `${lastName} ${firstName}`;
  option.id = email;
  option.patient_id = id;

  patients.appendChild(option);
};

/**
 * Получает всех пациентов
 *
 * @returns {Promise<void>}
 */

export default async () => {
  const { value } = search;

  const allPatient = await searchInputServices(value);

  if (allPatient) {
    patients.innerHTML = '';
    allPatient.forEach((item) => addOption(item));
  }
};
