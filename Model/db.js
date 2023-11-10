const mysql = require('mysql2/promise');

require('dotenv').config('../.env');

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_NODEJS_USER,
    password: process.env.SQL_NODEJS_PW,
    database: process.env.DB,
});

module.exports = { pool };