import { getPatientDataByID, getAllSpecializations } from './methods.js';
import refreshTableContentClick from '../buttons/refresh-table-content/controller.js';

const form = document.querySelector('form');
const datalist = document.querySelector('datalist');

export default async () => {
  try {
    const patient = await getPatientDataByID();
    if (patient) {
      Object.entries(patient).forEach((item) => {
        const [key, value] = item;

        if (form.elements[key]) {
          form.elements[key].value = value;
        }
      });

      refreshTableContentClick();
    }

    const specializations = await getAllSpecializations();
    if (specializations) {
      specializations.forEach((item) => {
        const option = document.createElement('option');

        const { specializationName, specializationID } = item;

        option.value = `${specializationName}`;

        option.id = `${specializationName}`;

        option.specializationID = specializationID;

        datalist.appendChild(option);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
