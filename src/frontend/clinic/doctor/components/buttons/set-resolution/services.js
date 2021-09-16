import { setResolution, deletePatient } from './methods.js';

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
