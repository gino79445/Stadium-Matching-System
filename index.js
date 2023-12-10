const { app } = require('./Route/app');
require('dotenv').config();

// These are required for running HTTPs and use certificates
const https = require('https');
const fs = require('fs');
//const options = {
//    key: fs.readFileSync('/home/ubuntu/private.key'),
//    cert: fs.readFileSync('/home/ubuntu/certificate.crt'),
//  };

//https.createServer(options, app).listen(3000, () => {
//    console.log('Server is running on port 3000');
//});

app.listen(3000, () => {
     console.log('Server is running on port 3000');
 });

