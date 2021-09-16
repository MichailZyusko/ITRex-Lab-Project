import express from 'express';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import config from './config.js';
import cronJob from './src/cron/deleteOldData.js';
import patientsRouter from './src/api/routes/patientsRouter.js';
import doctorsRouter from './src/api/routes/doctorsRouter.js';
import resolutionsRouter from './src/api/routes/resolutionsRouter.js';
import authorizationRouter from './src/api/routes/authorizationRouter.js';
import errorHandler from './src/errors/errorHandler.js';
import DBinitialization from './src/storage/database/index.js';
import isAuthPatient from './src/api/middleware/isAuthPatient.js';
import isAuthResolutions from './src/api/middleware/isAuthResolutions.js';
import getCookiesInfo from './src/api/middleware/getCookiesInfo.js';

const app = express();
const { app: { port, host } } = config;
(async () => {
  await DBinitialization();
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/patient-sign-in', express.static('src/frontend/authorization/sign-in/patient'));
app.use('/doctor-sign-in', express.static('src/frontend/authorization/sign-in/doctor'));
app.use('/sign-up', express.static('src/frontend/authorization/sign-up'));
app.use('/api/authorization', authorizationRouter);

app.use(cookieParser());
app.use(getCookiesInfo);

app.use('/doctor', express.static('src/frontend/clinic/doctor'));
app.use('/patient', express.static('src/frontend/clinic/patient'));

app.use('/api/resolutions', isAuthResolutions, resolutionsRouter);
app.use('/api/patients', isAuthPatient, patientsRouter);
app.use('/api/doctors', isAuthPatient, doctorsRouter);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}/patient-sign-in/...`);
});

cron.schedule('*/5 * * * * *', cronJob);
