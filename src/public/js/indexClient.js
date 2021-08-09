/* eslint-disable no-unused-vars */

import {
  randomUser, updateData, addClient, searchClient, clientMessage,
} from './handlers/index.js';

const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const form = document.getElementById('submitButton');
const search = document.getElementById('search');
const ws = new WebSocket('ws://localhost:3001');
// Создаем новое websoket соединение

ws.addEventListener('open', () => console.log('Connection opened...'));
ws.addEventListener('message', clientMessage);
ws.addEventListener('error', (err) => console.log(err));
ws.addEventListener('close', () => console.log('Connection closed...'));

form.addEventListener('click', () => addClient(ws));
search.addEventListener('change', async () => alert(await searchClient()));
document.addEventListener('DOMContentLoaded', () => updateData());
setInterval(() => randomUser(ws), random(8e3, 1.2e4));
