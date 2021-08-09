const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const { incomingQueue, outgoingQueue } = require('./src/server/routes/index.js');

const app = express();
const port = process.env.PORT ?? 3000;
const host = 'localhost';
const server = new WebSocket.Server({ port: 3001 }); // Создаем сервер на 3001 порту для WebSocet

// Создаем события прослушивания connection and message
server.on('connection', (ws) => {
  ws.on('message', (res) => {
    server.clients.forEach((client) => {
      // Проверяем на "доступность" сервера
      if (client.readyState === WebSocket.OPEN) {
        const message = res.toString('utf8');

        client.send(message);
      }
    });
  });

  ws.send('Is connected...');
});

// Создаем мидлваре и даем путь к HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add route api
app.use('/api', incomingQueue);
// app.use('/outgoingQueue', outgoingQueue); // Так как есть методот пост
app.use('/api', outgoingQueue);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}:...`);
});
