import searchInputServices from './services.js';

const addOption = (patient, datalist) => {
  const option = document.createElement('option');
  const {
    first_name: firstName, last_name: lastName, email, id,
  } = patient;

  option.value = email;
  option.label = `${lastName} ${firstName}`;
  option.id = email;
  option.patient_id = id;

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
