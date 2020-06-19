const mariadb = require('mariadb');
const config = require('../config');

const pool = mariadb.createPool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    connectionLimit : 5
});