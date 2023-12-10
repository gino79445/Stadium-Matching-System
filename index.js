const { app } = require('./Route/app');
require('dotenv').config();

// These are required for running HTTPs and use certificates
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('/Users/cdxvy30/example.com+5-key.pem'),
    cert: fs.readFileSync('/Users/cdxvy30/example.com+5.pem'),
  };

https.createServer(options, app).listen(3000, () => {
    console.log('Server is running on port 3000');
});
/*
app.listen(3000, () => {
     console.log('Server is running on port 3000');
 });
*/
