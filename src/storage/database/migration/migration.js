import execsql from 'execsql';
import config from '../../../../config.js';

const {
  database: {
    port, host, user, database, password,
  },
} = config;

const dbConfig = {
  host,
  user,
  port,
  password,
};
const sql = `use ${database};`;
const sqlFile = './migration_1.sql';

execsql.config(dbConfig)
  .exec(sql)
  .execFile(sqlFile, (err, results) => {
    console.log(results);
  }).end();
