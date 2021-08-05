/* eslint-disable import/extensions */
/* eslint-disable no-alert */
// TODO Поясни пожалуйста почему он просит ставить расширени .js в конец импорта

import { nextPerson } from './clinics/nextPerson.js';
import setDiagnosToClient from './clinics/setDiagnos.js';
import searchClient from './general/searchClient.js';
import deleteClient from './clinics/deleteClient.js';
import updateData from './general/updateData.js';
import onMessage from './clinics/websoketMessage.js';

const nextButton = document.getElementById('nextButton');
const search = document.getElementById('search');
const deleteButton = document.getElementById('deleteButton');
const setDiagnos = document.getElementById('setDiagnos');
const ws = new WebSocket('ws://localhost:3001');
// Создаем новое websoket соединение

// Вешаем обработчики событий на разные события
ws.onopen = () => console.log('Connection opened...');
ws.onclose = () => console.log('Connection closed...');
ws.onmessage = onMessage;

// Вешаем обработчики событий на разные события
search.addEventListener('change', () => searchClient('search'));
deleteButton.addEventListener('click', async () => alert(await deleteClient()));
nextButton.addEventListener('click', async () => alert(await nextPerson(ws)));
setDiagnos.addEventListener('click', async () => alert(await setDiagnosToClient()));
document.addEventListener('DOMContentLoaded', () => updateData());
