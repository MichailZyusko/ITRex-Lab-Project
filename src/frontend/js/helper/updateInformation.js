const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

export default (currentClient, nextClients, queueLength) => {
  queueStatus.textContent = `${queueLength} people before you`;
  firstName.textContent = currentClient.firstName;
  lastName.textContent = currentClient.lastName;
};
