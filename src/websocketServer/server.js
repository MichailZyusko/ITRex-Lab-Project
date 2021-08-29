import WebSocket, { WebSocketServer } from 'ws';
import config from './config.js';

const { socketServer: { port, host } } = config;

const server = new WebSocketServer({ host, port });

server.on('connection', (ws) => {
  ws.on('message', (res) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const message = res.toString('UTF8');

        client.send(message);
      }
    });
  });

  console.log('Websocket server connect with smb');
  ws.send('Is connected!');
});

console.log('Websocket server is running...');
