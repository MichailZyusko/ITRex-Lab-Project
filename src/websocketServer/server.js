import WebSocket, { WebSocketServer } from 'ws';
// Сделать конфиг файл
const port = 3001;
const host = '0.0.0.0';

const server = new WebSocketServer({ host, port });

// Создаем события прослушивания connection and message
server.on('connection', (ws) => {
  ws.on('message', (res) => {
    server.clients.forEach((client) => {
      // Проверяем на "доступность" сервера
      if (client.readyState === WebSocket.OPEN) {
        const message = res.toString('UTF8');

        client.send(message);
      }
    });
  });

  console.log('Websocket server connect with smb');
  ws.send('Is connected...');
});

console.log('Websocket server is running...');
