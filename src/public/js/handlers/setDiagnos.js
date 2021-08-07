import { setDiagnos } from '../services/index.js';

const time = document.getElementById('time');
const TTL = document.getElementById('TTL');

export default async () => {
  const resolutionText = document.getElementById('diagnosText');

  if (!resolutionText.value) {
    return 'Please, fill "set diagnos" field';
  }

  return setDiagnos(TTL.checked, +time.value, resolutionText.value);
};
