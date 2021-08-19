const {
  DEV_SOCKET_SERVER_PORT, DEV_SOCKET_SERVER_HOST,

  PROD_SOCKET_SERVER_PORT, PROD_SOCKET_SERVER_HOST,

  NODE_ENV,
} = process.env;

const dev = {
  socketServer: {
    port: +DEV_SOCKET_SERVER_PORT || 3001,
    host: DEV_SOCKET_SERVER_HOST || '0.0.0.0',
  },
};

const prod = {
  socketServer: {
    port: +PROD_SOCKET_SERVER_PORT || 3001,
    host: PROD_SOCKET_SERVER_HOST || '0.0.0.0',
  },
};

const config = {
  dev,
  prod,
};

export default config[NODE_ENV];
