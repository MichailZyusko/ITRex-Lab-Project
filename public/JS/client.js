/* eslint-disable import/extensions */
// TODO Поясни пожалуйста почему он просит ставить расширени .js в конец импорта

import addClient from './client/addClient.js';
import searchClient from './client/searchClient.js';
import onMessage from './client/websoketMessage.js';

// Добовляем в локальное хранилище два массива
localStorage.setItem('arr', '[]');
localStorage.setItem('result', '[]');

const addButton = document.getElementById('addButton');
const search = document.getElementById('search');
const ws = new WebSocket('ws://localhost:3001');
// Создаем новое websoket соединение

// Вешаем обработчики событий на разные события
ws.onopen = () => console.log('Connection opened...');
ws.onclose = () => console.log('Connection closed...');
ws.onmessage = onMessage;

// Вешаем обработчики событий на разные события
addButton.addEventListener('click', () => addClient(ws));
search.addEventListener('change', () => searchClient('search'));
