import { getPatientDataByID, getAllSpecializations } from './methods.js';
import refreshTableContentClick from '../buttons/refresh-table-content/controller.js';

const form = document.querySelector('form');
const specializationsDatalist = document.getElementById('specialities');

/**
 * Загружает информацию о пациенте и добавляем специализации всех докторов
 *
 * @returns {Promise<void>}
 */

export default async () => {
  try {
    const patient = await getPatientDataByID();
    if (patient) {
      Object.entries(patient).forEach((item) => {
        const [key, value] = item;

        if (form.elements[key]) {
          if (key === 'birthday') {
            const dt = new Date(Date.parse(value) - (new Date().getTimezoneOffset() * 60));
            form.elements[key].value = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
          } else {
            form.elements[key].value = value;
          }
        }
      });

      await refreshTableContentClick();
    }

    const specializations = await getAllSpecializations();
    if (specializations) {
      specializations.forEach((item) => {
        const option = document.createElement('option');

        const { specialization_name: specName, specialization_id: specID } = item;

        option.value = `${specName}`;
        option.id = `${specName}`;
        option.specializationID = specID;

        specializationsDatalist.appendChild(option);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
