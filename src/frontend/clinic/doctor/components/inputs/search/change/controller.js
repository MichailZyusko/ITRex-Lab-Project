import searchChangeServices from './services.js';
import deleteButtonClick from '../../../buttons/delete/controller.js';

const table = document.getElementById('table');

/**
 * Добавляет контент таблицы с резолюциями
 *
 * @param {string} patientID - UUID пациента
 * @returns {Promise<string>}
 */

const setSearchResult = async (patientID) => {
  function addTD(data, tr, isDate) {
    const td = document.createElement('td');
    if (data) {
      td.innerText = data;
    } else {
      td.innerText = '---';
    }

    if (isDate) {
      td.innerText = data.slice(0, 10);
    }

    tr.appendChild(td);
  }

  const tableContent = await searchChangeServices(patientID);
  try {
    if (tableContent) {
      table.innerHTML = '';
      let id = 0;

      console.log(tableContent);

      tableContent.forEach((element) => {
        const {
          resolution_id: resID, date, resolution_text: resText,
          status, doctor_specialization: docSpec, doctor_full_name: docName,
        } = element;
        const button = document.createElement('button');
        const td = document.createElement('td');
        const tr = document.createElement('tr');

        id += 1;
        addTD(id, tr);
        addTD(docSpec, tr);
        addTD(docName, tr);
        addTD(resText, tr);
        addTD(status, tr);
        addTD(date, tr, true);

        button.resolutionID = resID;
        button.innerText = 'DELETE';
        button.className = 'button h3';
        button.style.fontSize = '10px';
        button.style.padding = '0px 3px';
        button.addEventListener('click', deleteButtonClick);

        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr);
      });
    }
    return 'We found something for you';
  } catch (error) {
    console.error(error);
  }
};

export default () => {
  const searchValue = document.getElementById('search').value.trim();
  const optionWithID = document.getElementById(searchValue);
  const { patient_id: id } = optionWithID;

  if (!id) {
    return 'Nothing was found for your query ';
  }

  return setSearchResult(id);
};
