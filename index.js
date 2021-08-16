import express from 'express';
import clients from './src/backend/server/routes/index.js';

const app = express();
// Занести в конфиг файл
const port = process.env.PORT ?? 3000;
const host = '0.0.0.0';

app.use(express.static('src/frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/clients', clients);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}...`);
});
