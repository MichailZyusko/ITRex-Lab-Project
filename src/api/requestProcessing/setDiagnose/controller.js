import queue from '../../../storage/index.js';

export default async ({ data: { diagnose, ID, TTL } }, res, next) => {
  try {
    await queue.setDiagnose(ID, diagnose, TTL);

    // Мб стоит возвращать объект который мы изменили
    res.send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
