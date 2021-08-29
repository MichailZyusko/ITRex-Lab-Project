/* eslint-disable no-unused-vars */

import {
  randomUser, updateData, addClient, searchClient, clientMessage,
} from './controllers/index.js';
import websocket from './websocket/websocket.js';

// const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const form = document.getElementById('submitButton');
const search = document.getElementById('search');
const ws = websocket(clientMessage);

form.addEventListener('click', () => addClient(ws));
search.addEventListener('change', async () => alert(await searchClient()));
document.addEventListener('DOMContentLoaded', () => updateData());
// setInterval(() => randomUser(ws), random(5e3, 10e3));
