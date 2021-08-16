/* eslint-disable no-return-await */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const diagnoseText = document.getElementById('diagnoseText');
const form = document.querySelector('form');
const profileImg = document.getElementById('profileImg');

let previousClient = null;

const changeText = (currentClient, nextClients, queueLength) => {
  if (currentClient) {
    queueStatus.textContent = `${queueLength - 1} person in line`;

    if (nextClients) {
      firstName.textContent = nextClients.firstName;
      lastName.textContent = nextClients.lastName;
    } else if (currentClient) {
      firstName.textContent = 'You don\'t have new patient\'s';
      lastName.textContent = '';
    }

    Object.entries(currentClient).forEach((item) => {
      const [key, value] = item;

      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });

    profileImg.src = currentClient.picture
      ? currentClient.picture
      : '../../html/src/img/profilePicture.svg';

    diagnoseText.value = '';
    return null;
  }

  Array.from(form).forEach((element) => { element.value = ''; });

  firstName.textContent = 'You don\'t have new patient\'s';
  lastName.textContent = '';
  profileImg.src = '../../html/src/img/profilePicture.svg';
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

export default async (currentClient, nextClients, queueLength) => {
  if (currentClient) {
    changeText(currentClient, nextClients, queueLength);
    return checkDiagnose(currentClient);
  }

  changeText(currentClient, nextClients, queueLength);

  return 'You don\'t have new patient\'s';
};
