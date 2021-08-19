import config from './config.js';

const { socketClient: { host, port } } = config;

export default (handler) => {
  const ws = new WebSocket(`ws://${host}:${port}`);

  ws.addEventListener('open', () => console.log('Connection opened...'));
  ws.addEventListener('message', handler);
  ws.addEventListener('error', (err) => console.log(err));
  ws.addEventListener('close', () => console.log('Connection closed...'));

  return ws;
};
