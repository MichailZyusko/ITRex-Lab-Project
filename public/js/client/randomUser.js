/* eslint-disable import/extensions */

import addClient from './addClient.js';

const URL = 'https://randomuser.me/api/';

export default async function randomUser(ws) {
  const preresult = await fetch(URL);
  const result = await preresult.json();

  addClient(ws, ...result.results);
}
