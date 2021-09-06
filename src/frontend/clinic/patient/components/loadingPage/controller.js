import getPatientDataByID from './methods.js';
import refreshTableContentClick from '../buttons/refresh-table-content/controller.js';

const form = document.querySelector('form');

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
  } catch (error) {
    console.log(error);
  }
};
