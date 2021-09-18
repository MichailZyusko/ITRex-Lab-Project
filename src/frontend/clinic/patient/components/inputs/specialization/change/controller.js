import getDoctorNames from './methods.js';

const specializationInput = document.getElementById('doctorSpecialization');
const nameDatalist = document.getElementById('names');

const addOption = (item) => {
  const option = document.createElement('option');

  option.value = `${item.first_name} ${item.last_name}`;
  option.id = `${item.first_name} ${item.last_name}`;
  option.doctorID = item.doctor_id;

  nameDatalist.appendChild(option);
};

export default async () => {
  const selectedOption = document.getElementById(specializationInput.value);
  const { specializationID } = selectedOption;
  const doctorNames = await getDoctorNames(specializationID);

  if (doctorNames) {
    doctorNames.forEach((item) => addOption(item));
  }
};
