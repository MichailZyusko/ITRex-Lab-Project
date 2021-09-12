import queueUp from './methods.js';

export default async (/* ws */) => {
  try {
    // ws.send()
    const doctor = document.getElementById('doctorSpecialization').value.trim();
    const optionWithID = document.getElementById(doctor);
    const { specializationID } = optionWithID;
    const { positionInQueue } = await queueUp(specializationID);

    if (positionInQueue) {
      document.getElementById('queueStatus').innerText = `${positionInQueue} people before You`;
      alert('Client succsessfully add :)');
      return true;
    }

    alert('Failed to add a client :(');
    return false;
  } catch (error) {
    console.log(error);
  }
};
