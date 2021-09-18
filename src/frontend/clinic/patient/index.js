import {
  queueUpClick, refreshTableContentClick, updateData, specializationChangeController,
} from './components/index.js';

const submitButton = document.getElementById('submitButton');
const refreshButton = document.getElementById('reload');
const specializationInput = document.getElementById('doctorSpecialization');

submitButton.addEventListener('click', queueUpClick);
refreshButton.addEventListener('click', refreshTableContentClick);
specializationInput.addEventListener('change', specializationChangeController);
document.addEventListener('DOMContentLoaded', updateData);
