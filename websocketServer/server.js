import WebSocket, { WebSocketServer } from 'ws';

const server = new WebSocketServer({ host: '0.0.0.0', port: '3001' }); // Создаем сервер на 3001 порту для websocket

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

  console.log('Websocket server connect with smb');
  ws.send('Is connected...');
});

console.log('Websocket server is running...');
