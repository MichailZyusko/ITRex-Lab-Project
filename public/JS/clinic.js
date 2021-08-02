/* eslint-disable import/extensions */
// TODO Поясни пожалуйста почему он просит ставить расширени .js в конец импорта

import nextPerson from './clinic/nextPerson.js';
import setResolutionToClient from './clinic/setResolution.js';
import searchClient from './client/searchClient.js';
import deleteClient from './clinic/deleteClient.js';
import onMessage from './clinic/websoketMessage.js';

const nextButton = document.getElementById('nextButton');
const deleteInput = document.getElementById('deleteInput');
const deleteButton = document.getElementById('deleteButton');
const setResolution = document.getElementById('setResolution');
const ws = new WebSocket('ws://localhost:3001');
// Создаем новое websoket соединение

// Вешаем обработчики событий на разные события
ws.onopen = () => console.log('Connection opened...');
ws.onclose = () => console.log('Connection closed...');
ws.onmessage = onMessage;

// Вешаем обработчики событий на разные события
deleteInput.addEventListener('change', () => searchClient('deleteInput'));
deleteButton.addEventListener('click', () => deleteClient());
nextButton.addEventListener('click', () => nextPerson(ws));
setResolution.addEventListener('click', () => setResolutionToClient());
