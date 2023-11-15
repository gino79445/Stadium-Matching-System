const express = require('express');
const cors = require('cors');
const userRouter = require('./user');
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


app.use('/static', express.static(process.env.UPLOAD_PATH));
app.use('/default_images', express.static(process.env.DEFAULT_PROFILE_PATH));
app.use('/api/user', userRouter);

module.exports = { app };
