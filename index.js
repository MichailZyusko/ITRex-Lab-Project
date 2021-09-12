import express from 'express';
import cookieParser from 'cookie-parser';

import config from './config.js';
import patientsRouter from './src/api/routes/patientsRouter.js';
import doctorsRouter from './src/api/routes/doctorsRouter.js';
import resolutionsRouter from './src/api/routes/resolutionsRouter.js';
import authorizationRouter from './src/api/routes/authorizationRouter.js';
import errorHandler from './src/errors/errorHandler.js';
import isAuth from './src/api/middleware/isAuth.js';

const app = express();
const { app: { port, host } } = config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/patient-sign-in', express.static('src/frontend/authorization/patient-sign-in'));
app.use('/doctor-sign-in', express.static('src/frontend/authorization/doctor-sign-in'));
app.use('/sign-up', express.static('src/frontend/authorization/sign-up'));
app.use('/api/authorization', authorizationRouter);

app.use(cookieParser());
app.use(isAuth);

app.use('/doctor', express.static('src/frontend/clinic/doctor'));
app.use('/patient', express.static('src/frontend/clinic/patient'));

app.use('/api/resolutions', resolutionsRouter);
app.use('/api/clients', patientsRouter);
app.use('/api/doctors', doctorsRouter);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}/patient-sign-in/...`);
});
