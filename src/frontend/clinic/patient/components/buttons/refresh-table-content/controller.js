/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import getMedicalCardContent from './methods.js';

const table = document.getElementById('table');

export default async () => {
  const tableContent = await getMedicalCardContent();

  if (tableContent) {
    table.innerHTML = '';
    let id = 1;

    tableContent.forEach((element) => {
      const tr = document.createElement('tr');
      for (const [key, value] of Object.entries(element)) {
        if (key === 'id') {
          const td = document.createElement('td');
          td.innerText = id++;
          tr.appendChild(td);
        } else if (key === 'doctorSpecialization') {
          const td = document.createElement('td');
          td.innerText = value;
          tr.appendChild(td);
        } else if (key === 'doctorName') {
          const td = document.createElement('td');
          td.innerText = value;
          tr.appendChild(td);
        } else if (key === 'date') {
          const td = document.createElement('td');
          td.innerText = value.slice(0, 19).replace('T', ' ');
          tr.appendChild(td);
        } else if (key === 'resolutionText') {
          const td = document.createElement('td');
          td.innerText = value;
          tr.appendChild(td);
        } else if (key === 'status') {
          const td = document.createElement('td');
          td.innerText = value;
          tr.appendChild(td);
        }
      }

      table.appendChild(tr);
    });
  }
};
