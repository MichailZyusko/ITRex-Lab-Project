/* eslint-disable no-underscore-dangle */

const express = require('express');
const path = require('path');
const WebSocket = require('ws');
// const Queue = require('./classes/Queue');
const IncomingQueue = require('./classes/IncomingQueue');
const OutgoingQueue = require('./classes/OutgoingQueue');

const app = express();
const port = process.env.PORT ?? 3000;
const incomingQueue = new IncomingQueue();
const outgoingQueue = new OutgoingQueue();
const server = new WebSocket.Server({ port: 3001 }); // Создаем сервер на 3001 порту для WebSocet

// Создаем события прослушивания connection and message
server.on('connection', (ws) => {
  ws.on('message', (res) => {
    server.clients.forEach((client) => {
      // Проверяем на "доступность" сервера
      if (client.readyState === WebSocket.OPEN) {
        // Конвертируем buffer в строку и отправляем ее на наши сайты
        const message = res.toString('utf8');

        client.send(message);
      }
    });
  });

  ws.send('Is connected...');
});

// Создаем мидлваре и даем путь к HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Перейдя по пути http://localhost:3000/inputQueue можно получить инфу о клиентах в очереди
app.get('/inputQueue', (req, res) => {
  res.send(incomingQueue._data);
});

// Перейдя по пути http://localhost:3000/outputQueue можно получить инфу о клиентах которые вышли из кабинета
app.get('/outputQueue', (req, res) => {
  res.send(outgoingQueue._data);
});

// Добавляет клиента в конец очереди к врачу
app.post('/input/addClient', (req, res) => {
  console.log('/input/addClient', req.body);
  incomingQueue.add(req.body);

  res.send(req.body);
});

// Удаляет клиента из начала очереди к врачу
app.post('/input/removeClient', (req, res) => {
  console.log('This item was successfuly delete');
  console.log(incomingQueue.remove());

  res.send(req.body);
});

// Добавляет клиента в список людей, которые вышли из кабинета
app.post('/output/addClient', (req, res) => {
  console.log('/output/addClient', req.body);
  outgoingQueue.add(req.body);
  if (req.body.TTL >= 0) {
    setTimeout(() => {
      outgoingQueue.deleteElement({ search: req.body.firstName });
    }, req.body.TTL);
  }

  res.send(req.body);
});

// Ищет из список людей, которые вышли из кабинета, человека,
// чье имя было передано в качестве тела запроса
app.post('/output/searchClient', (req, res) => {
  console.log('/output/addClient', req.body);

  res.send(outgoingQueue.findElement(req.body));
});

// Удаляет из список людей, которые вышли из кабинета, человека,
// чье имя было передано в качестве тела запроса
app.post('/output/deleteElement', (req, res) => {
  console.log('/output/deleteElement', req.body);

  res.send(outgoingQueue.deleteElement(req.body));
});

// Вешаем слушателя на 3000 порт или тот, который введут в консоль
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});
