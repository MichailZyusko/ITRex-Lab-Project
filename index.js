import express from 'express';
import { incomingQueue, outgoingQueue } from './src/server/routes/index.js';

const app = express();
const port = process.env.PORT ?? 3000;
const host = '0.0.0.0';

// Создаем мидлваре и даем путь к HTML, CSS, JS
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/incomingQueue', incomingQueue);
app.use('/api/outgoingQueue', outgoingQueue);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}...`);
});
