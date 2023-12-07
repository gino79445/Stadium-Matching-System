const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const pool = require('../Model/db');
const options = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_NODEJS_USER,
    password: process.env.SQL_NODEJS_PW,
    database: process.env.DB,
    pool,
};
const sessionStore = new MySQLStore(options);

const Session = session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 1000
    }
});

module.exports = {
  Session
};
