/* eslint-disable no-unused-vars */

import {
  randomUser, updateData, addClient, searchClient, clinicMessage, clientMessage,
} from './handlers/index.js';
import websocket from './websocket/websocket.js';

const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const form = document.getElementById('submitButton');
const search = document.getElementById('search');
const ws = websocket(clientMessage);

form.addEventListener('click', () => addClient(ws));
search.addEventListener('change', async () => alert(await searchClient()));
document.addEventListener('DOMContentLoaded', () => updateData());
setInterval(() => randomUser(ws), random(8e3, 1.2e4));
