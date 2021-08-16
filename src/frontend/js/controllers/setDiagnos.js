import { setDiagnose } from '../services/index.js';

const time = document.getElementById('time');
const TTL = document.getElementById('TTL');

export default async () => {
  const resolutionText = document.getElementById('diagnoseText');

  if (!resolutionText.value) {
    return 'Please, fill "set diagnose" field';
  }

  return setDiagnose(TTL.checked, +time.value, resolutionText.value);
};
