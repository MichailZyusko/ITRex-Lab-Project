import searchInputServices from './services.js';

const addOption = (patient, datalist) => {
  const option = document.createElement('option');
  const {
    firstName, lastName, email, patientID,
  } = patient;

  option.value = `${lastName} | ${firstName} | ${email}`;

  option.id = `${lastName} | ${firstName} | ${email}`;

  option.patientID = patientID;

  // option.value = `${lastName} ${firstName}`;
  // option.label = `${email}`;

  datalist.appendChild(option);
};

const search = document.getElementById('search');
const patients = document.getElementById('patients');

export default async () => {
  const { value } = search;

  const allPatient = await searchInputServices(value);

  if (allPatient) {
    patients.innerHTML = '';
    allPatient.forEach((item) => addOption(item, patients));
  }
};
