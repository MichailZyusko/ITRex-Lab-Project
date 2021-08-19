import queue from '../../../storage/index.js';

export default async (req, res, next) => {
  try {
    // МБ добавить логирование, что зашел новый клиент
    res.send(await queue.callNextClient());
  } catch (error) {
    next(error);
  }
};
