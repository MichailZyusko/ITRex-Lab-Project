const dev = {
  app: {
    port: +process.env.DEV_APP_PORT || 3000,
    host: process.env.DEV_APP_HOST || 'localhost',
  },
  redis: {
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: +process.env.DEV_DB_PORT || 6379,
  },
  database: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: +process.env.DEV_DB_PORT || 3306,
    user: 'root',
    password: '',
    dialect: 'mysql',
    databaseName: 'queuedb',
  },
  secretKey: 'SECRET_KEY',
  // Когда поднимаешь докер, то нужно указать host : storage
  storage: {
    storageType: process.env.DEV_DB_STORAGE_TYPE || 'redis',
  },
  client: {
    TTL: process.env.DEV_CLIENT_TTL || 60000,
  },
};

const prod = {
  app: {
    port: +process.env.PROD_APP_PORT || 3000,
    host: process.env.PROD_APP_HOST || '0.0.0.0',
  },
  storage: {
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    port: +process.env.PROD_DB_PORT || 6379,
    storageType: process.env.PROD_DB_STORAGE_TYPE || 'redis',
  },
  client: {
    TTL: process.env.PROD_CLIENT_TTL || 60000,
  },
};

const config = {
  dev,
  prod,
};

export default config[process.env.NODE_ENV];
