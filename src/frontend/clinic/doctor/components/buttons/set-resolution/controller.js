import { getCurrentPatient } from './methods.js';
import setResolution from './services.js';

const time = document.getElementById('time');
const resolutionText = document.getElementById('diagnoseText');

// const isEmptyData = () => data.firstName && data.lastName;

export default async (ws) => {
  if (!resolutionText.value) {
    return 'Please, fill "set diagnose" field';
  }

  // if (!isEmptyData()) {
  //   return 'You forgot to call your next client';
  // }

  const currentPatient = await getCurrentPatient();

  return setResolution(+time.value, resolutionText.value, currentPatient, ws);
};
