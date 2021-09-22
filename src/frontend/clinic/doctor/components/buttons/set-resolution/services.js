import { setResolution, deletePatient } from './methods.js';

/**
 * Задает текущему пациенту резолюцию, и время жизни для этой резолюции
 *
 * @param {number} timeToLive - время в мс. сколько отводиться для жизни резолюции
 * @param {string} resolutionText - текст резолюции
 * @param {object} currentPatient - текущий пациент
 * @returns {Promise<string>}
 */

export default async (timeToLive, resolutionText, currentPatient) => {
  if (currentPatient) {
    const patient = await setResolution(currentPatient.id, {
      value: resolutionText,
      TTL: new Date(new Date().getTime() + timeToLive),
    });

    if (patient) {
      await deletePatient();
      return 'Resolution successfully added';
    }

    return 'Couldn\'t add a resolution :(';
  }

  return 'You don\'t have a patient to see right now.';
};
