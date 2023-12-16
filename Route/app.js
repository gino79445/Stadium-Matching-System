const express = require('express');
const cors = require('cors');
const userRouter = require('./user');
const homeRouter = require('./home');
const stadiumRouter = require ('./stadium')
const activityRouter = require('./activity');
const eventRouter = require('./event');
const feedbackRouter = require('./feedback');
const morgan = require('morgan');
const logger = require('../utils/logger/initLogger');
const responseTime = require('response-time');
const logResponseTime = require('../utils/logger/responseTime');
const logError = require('../utils/logger/error');
const app = express();
const { Session } = require('../utils/session');
require('dotenv').config('../.env');

logger.info("Starting App...");

const corsOptions = {
    // allow localhost only for test
    origin: ["http://localhost:5173", "http://192.168.0.55:5173"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}

app.use(responseTime())
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use(Session);
app.use(responseTime(logResponseTime));

app.get('/health', (req, res) => {
    return res.status(200).send('OK');
});

//app.use('/.well-known/pki-validation', express.static('/.well-known/pki-validation/'));
app.use('/static', express.static('/home/ubuntu/Stadium-Matching-System/app'));
app.use('/default_images', express.static(process.env.DEFAULT_PROFILE_PATH));
app.use('/api/user', userRouter);
app.use('/api/home',homeRouter);
app.use('/api/stadium',stadiumRouter);
app.use('/api/activity', activityRouter);
app.use('/api/event', eventRouter);
app.use('/api/feedback', feedbackRouter);

app.use(logError);

module.exports = { app };
