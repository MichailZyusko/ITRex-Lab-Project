const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT ?? 3000;
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

  ws.send('Is connected');
});

// Создаем мидлваре и даем путь к HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Вешаем слушателя на 3000 порт или тот, который введут в консоль
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});
