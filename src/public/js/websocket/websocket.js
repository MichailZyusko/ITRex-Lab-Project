const port = '3001';
const host = 'localhost';

export default (handler) => {
  const ws = new WebSocket(`ws://${host}:${port}`);

  ws.addEventListener('open', () => console.log('Connection opened...'));
  ws.addEventListener('message', handler);
  ws.addEventListener('error', (err) => console.log(err));
  ws.addEventListener('close', () => console.log('Connection closed...'));

  return ws;
};
