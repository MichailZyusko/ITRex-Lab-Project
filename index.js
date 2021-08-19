import express from 'express';
import config from './config.js';
import router from './src/backend/routes/index.js';

const app = express();
const { app: { port, host } } = config;

app.use(express.static('src/frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/clients', router);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}...`);
});
