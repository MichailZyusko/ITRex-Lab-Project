import getQueue from '../methods/GET.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

const clientMessage = async (res) => {
  if (res.data !== 'clinic') {
    return null;
  }

  const clients = await getQueue('incomingQueue');

  if (clients.length > 1) {
    firstName.textContent = clients[0].firstName;
    lastName.textContent = clients[0].lastName;
    queueStatus.innerText = `${clients.length} people before you`;
  } else if (clients.length === 1) {
    firstName.textContent = 'Wait to be called';
    lastName.textContent = '';
    queueStatus.innerText = `${clients.length - 1} people before you`;
  }

  return null;
};

const clinicMessage = async (res) => {
  if (res.data !== 'client') {
    return null;
  }

  const clients = await getQueue('incomingQueue');

  if (clients.length) {
    firstName.textContent = clients[0].firstName;
    lastName.textContent = clients[0].lastName;
  } else {
    firstName.textContent = 'You don\'t have new pacients';
    lastName.textContent = '';
  }

  queueStatus.textContent = `${clients.length} person in line`;

  return null;
};

export { clientMessage, clinicMessage };
