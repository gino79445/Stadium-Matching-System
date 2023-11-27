const express = require('express');
const cors = require('cors');
const userRouter = require('./user');
const homeRouter = require('./home');
const stadiumRouter = require ('./stadium')
const morgan = require('morgan');
const app = express();
const { Session } = require('../utils/session');
require('dotenv').config('../.env');



const corsOptions = {
    //all origin for now
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use(Session);


app.get('/health', (req, res) => {
    return res.status(200).send('OK');
});


app.use('/static', express.static('/home/ubuntu/Stadium-Matching-System/app'));
app.use('/default_images', express.static(process.env.DEFAULT_PROFILE_PATH));
app.use('/api/user', userRouter);
app.use('/api/home',homeRouter);
app.use('/api/stadium',stadiumRouter);

module.exports = { app };
