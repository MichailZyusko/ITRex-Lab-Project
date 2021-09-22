import getCurrentPatient from './methods.js';

const diagnoseText = document.getElementById('diagnoseText');
const form = document.querySelector('form');

let previousClient = null;

/**
 * Обновляет информацию о текущем пациенте на странице
 *
 * @param {object} currentPatient - текущий пациент
 * @returns {null}
 */

const changeText = (currentPatient) => {
  if (currentPatient) {
    Object.entries(currentPatient).forEach((item) => {
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

    diagnoseText.value = '';
    return null;
  }

  // eslint-disable-next-line no-param-reassign
  Array.from(form).forEach((element) => { element.value = ''; });
  diagnoseText.value = '';

  return null;
};

/**
 * Проверяет новый это пациент или нет
 *
 * @param {object} currentPatient - текущий пациент
 * @returns {Promise<string>}
 */

const checkNewPatient = async (currentPatient) => {
  if (previousClient !== currentPatient) {
    previousClient = currentPatient;
    return 'Call the next patient';
  }

  return 'Please, fill resolution for this client';
};

/**
 * Получает текущего пациента
 *
 * @returns {Promise<string|string>}
 */

export default async () => {
  const currentPatient = await getCurrentPatient();

  if (currentPatient) {
    changeText(currentPatient);

    return checkNewPatient(currentPatient);
  }

  changeText(currentPatient);

  return 'You don\'t have new patient\'s';
};
