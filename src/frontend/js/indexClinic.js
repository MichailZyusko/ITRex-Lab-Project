import {
  deleteClient, updateData, searchClient, setDiagnose, nextClient, clinicMessage,
} from './controllers/index.js';
import websocket from './websocket/websocket.js';

const nextButton = document.getElementById('nextButton');
const searchInput = document.getElementById('search');
const deleteButton = document.getElementById('deleteButton');
const setDiagnoseButton = document.getElementById('setDiagnose');
const ws = websocket(clinicMessage);

searchInput.addEventListener('change', async () => alert(await searchClient()));
deleteButton.addEventListener('click', async () => alert(await deleteClient()));
setDiagnoseButton.addEventListener('click', async () => alert(await setDiagnose()));
nextButton.addEventListener('click', async () => alert(await nextClient(ws)));
document.addEventListener('DOMContentLoaded', () => updateData());
