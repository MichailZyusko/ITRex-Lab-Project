import getMedicalCardContent from './methods.js';

const table = document.getElementById('table');

export default async () => {
  const tableContent = await getMedicalCardContent();
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

  try {
    if (tableContent) {
      table.innerHTML = '';
      let id = 0;

      console.log(tableContent);

      tableContent.forEach((element) => {
        const {
          date, resolution_text: resText,
          status, doctor_specialization: docSpec, doctor_full_name: docName,
        } = element;
        const tr = document.createElement('tr');

        id += 1;
        addTD(id, tr);
        addTD(docSpec, tr);
        addTD(docName, tr);
        addTD(resText, tr);
        addTD(status, tr);
        addTD(date, tr, true);

        table.appendChild(tr);
      });
    }
    return 'We found something for you';
  } catch (error) {
    console.error(error);
  }
};
