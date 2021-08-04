/* eslint-disable import/extensions */
// TODO Поясни пожалуйста почему он просит ставить расширени .js в конец импорта

import addClient from './client/addClient.js';
import randomUser from './client/randomUser.js';
import searchClient from './general/searchClient.js';
import updateData from './general/updateData.js';
import onMessage from './client/websoketMessage.js';

const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const form = document.getElementById('submitButton');
const search = document.getElementById('search');
const ws = new WebSocket('ws://localhost:3001');
// Создаем новое websoket соединение

// Вешаем обработчики событий на разные события
ws.onopen = () => console.log('Connection opened...');
ws.onclose = () => console.log('Connection closed...');
ws.onmessage = onMessage;

// Вешаем обработчики событий на разные события
form.addEventListener('click', () => addClient(ws));
search.addEventListener('change', () => searchClient('search'));
document.addEventListener('DOMContentLoaded', () => updateData());
setInterval(() => randomUser(ws), random(1e4, 1.5e4));
