import { setDiagnose } from '../services/index.js';

const time = document.getElementById('time');
const resolutionText = document.getElementById('diagnoseText');

export default async () => {
  if (!resolutionText.value) {
    return 'Please, fill "set diagnose" field';
  }

  return setDiagnose(+time.value, resolutionText.value);
};
