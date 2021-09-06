/* eslint-disable no-return-await */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

import getCurrentPatient from './methods.js';

const diagnoseText = document.getElementById('diagnoseText');
const form = document.querySelector('form');

let previousClient = null;

const changeText = (currentClient) => {
  if (currentClient) {
    Object.entries(currentClient).forEach((item) => {
      const [key, value] = item;

      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });

    diagnoseText.value = '';
    return null;
  }

  Array.from(form).forEach((element) => { element.value = ''; });
  diagnoseText.value = '';

  return null;
};

const checkDiagnose = async (currentClient) => {
  if (previousClient !== currentClient) {
    previousClient = currentClient;
    return 'Call the next patient';
  }

  return 'Please, fill resolution for this client';
};

export default async (/* ws */) => {
  // ws.send(client)
  const currentClient = await getCurrentPatient();

  if (currentClient) {
    changeText(currentClient);
    return checkDiagnose(currentClient);
  }

  changeText(currentClient);

  return 'You don\'t have new patient\'s';
};
