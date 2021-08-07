import {
  deleteClient, updateData, searchClient, setDiagnos, nextClient, clinicMessage,
} from './handlers/index.js';

const nextButton = document.getElementById('nextButton');
const searchInput = document.getElementById('search');
const deleteButton = document.getElementById('deleteButton');
const setDiagnosButton = document.getElementById('setDiagnos');
const ws = new WebSocket('ws://localhost:3001');
// Создаем новое websoket соединение

ws.addEventListener('open', () => console.log('Connection opened...'));
ws.addEventListener('message', clinicMessage);
ws.addEventListener('error', (err) => console.log(err));
ws.addEventListener('close', () => console.log('Connection closed...'));

searchInput.addEventListener('change', async () => alert(await searchClient()));
deleteButton.addEventListener('click', async () => alert(await deleteClient()));
setDiagnosButton.addEventListener('click', async () => alert(await setDiagnos()));
nextButton.addEventListener('click', async () => alert(await nextClient(ws)));
document.addEventListener('DOMContentLoaded', () => updateData());
