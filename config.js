import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: {
    port: +process.env.APP_PORT,
    host: process.env.APP_HOST,
  },
  redis: {
    host: process.env.R_HOST,
    port: +process.env.R_PORT,
  },
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  },
  secretKey: process.env.TOKEN_KEY,
  TTL: process.env.TTL_DEFAULT,
};

const config = {
  dev,
};

export default config[process.env.NODE_ENV];
