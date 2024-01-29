const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'erick',
    database: 'anpr_db',
    connectTimeout: 20000,
});

module.exports = { db };


