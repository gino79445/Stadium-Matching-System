const express = require('express');
const cors = require('cors');
const userRouter = require('./user');
const homeRouter = require('./home');
const adminRouter = require('./admin');
const stadiumRouter = require ('./stadium');
const activityRouter = require('./activity');
const eventRouter = require('./event');
const feedbackRouter = require('./feedback');
const morgan = require('morgan');
const app = express();
const { Session } = require('../utils/session');
require('dotenv').config('../.env');

const corsOptions = {
    // allow localhost only for test
	origin: ["http://localhost:5173", "http://192.168.0.55:5173", 'https://stadium.azureedge.net', 'https://www.postman.com/', 'https://stadium.rdto.io'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}

app.enable('trust proxy');
app.set('trust proxy', true);

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use(Session);


app.get('/health', (req, res) => {
    return res.status(200).send('OK');
});

app.get('/api/trust', (req, res) => {
    const ip = req.ip;
    console.log(app.get("trust proxy"))
    return res.json({ ip: ip });
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
app.use('/api/admin', adminRouter);
module.exports = { app };
