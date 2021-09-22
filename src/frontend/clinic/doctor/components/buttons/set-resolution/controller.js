import { getCurrentPatient } from './methods.js';
import setResolution from './services.js';

const time = document.getElementById('time');
const resolutionText = document.getElementById('diagnoseText');

/**
 * Задает текущем пациенту определенную резолюцию
 *
 * @returns {Promise<string|*|string>}
 */

export default async () => {
  if (!resolutionText.value) {
    return 'Please, fill "set diagnose" field';
  }

  const currentPatient = await getCurrentPatient();

  return setResolution(+time.value, resolutionText.value, currentPatient);
};
