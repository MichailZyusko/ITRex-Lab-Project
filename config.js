const {
  DEV_APP_HOST, DEV_APP_PORT, DEV_CLIENT_TTL,
  DEV_DB_PORT, DEV_DB_HOST, DEV_DB_STORAGE_TYPE,

  PROD_APP_HOST, PROD_APP_PORT, PROD_CLIENT_TTL,
  PROD_DB_PORT, PROD_DB_HOST, PROD_DB_STORAGE_TYPE,

  NODE_ENV,
} = process.env;

const dev = {
  app: {
    port: +DEV_APP_PORT || 3000,
    host: DEV_APP_HOST || '0.0.0.0',
  },
  redis: {
    host: DEV_DB_HOST || '127.0.0.1',
    port: +DEV_DB_PORT || 6379,
  },
  database: {
    host: DEV_DB_HOST || 'localhost',
    port: +DEV_DB_PORT || 3306,
    user: 'root',
    password: '',
    dialect: 'mysql',
    databaseName: 'queuedb',
  },
  // Когда поднимаешь докер, то нужно указать host : storage
  storage: {
    storageType: DEV_DB_STORAGE_TYPE || 'database',
  },
  client: {
    TTL: DEV_CLIENT_TTL || 60000,
  },
};

const prod = {
  app: {
    port: +PROD_APP_PORT || 3000,
    host: PROD_APP_HOST || '0.0.0.0',
  },
  storage: {
    host: PROD_DB_HOST || '127.0.0.1',
    port: +PROD_DB_PORT || 6379,
    storageType: PROD_DB_STORAGE_TYPE || 'redis',
  },
  client: {
    TTL: PROD_CLIENT_TTL || 60000,
  },
};

const config = {
  dev,
  prod,
};

export default config[NODE_ENV];
