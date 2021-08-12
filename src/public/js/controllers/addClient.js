import { addClient } from '../services/index.js';

const form = document.querySelector('form');

// Добавляет нового пациента в очередь
export default async (ws) => {
  const data = Object.fromEntries(new FormData(form).entries());

  await addClient(ws, data, null);

  return null;
};
