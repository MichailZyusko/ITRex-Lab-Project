import { queueUpClick, refreshTableContentClick, updateData } from './components/index.js';

const submitButton = document.getElementById('submitButton');
const refreshButton = document.getElementById('reload');

submitButton.addEventListener('click', queueUpClick);
refreshButton.addEventListener('click', refreshTableContentClick);
document.addEventListener('DOMContentLoaded', updateData);
