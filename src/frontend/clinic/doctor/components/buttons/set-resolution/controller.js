import { getCurrentPatient } from './methods.js';
import setResolution from './services.js';

const time = document.getElementById('time');
const resolutionText = document.getElementById('diagnoseText');

export default async (ws) => {
  if (!resolutionText.value) {
    return 'Please, fill "set diagnose" field';
  }

  const currentPatient = await getCurrentPatient();

  return setResolution(+time.value, resolutionText.value, currentPatient, ws);
};
