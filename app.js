'use strict'

// remember to type 'thisisunsafe' to make it work -- https://stackoverflow.com/questions/35565278/ssl-localhost-privacy-error
// remember to visit both the inner and outer pages FIRST and type 'thisisunsafe' or 'allow' in Safari

// creating SSL certs -- https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28

// Define the basic imports and constants.
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const port = 5002;

// Get the keys and certs for HTTPS.
const key = fs.readFileSync('./ssl/www-key.pem');
const cert = fs.readFileSync('./ssl/www-cert.pem');


// Setup the outside app with the www folder as static content.
app.use(express.static('src', {setHeaders: function (res, path, stat) {
  res.set('Set-Cookie', "embeddedCookie=Hello from an embedded third party cookie!;Path=/;Secure;SameSite=None");
}}));


// Create the outside app with the first key / cert and run it.
const server = https.createServer({ key: key, cert: cert }, app);
server.listen(port, () => {
  console.log(`Open browser to https://localhost:${port}/ to begin.`);
});

// // Create the embedded app with the www2 folder as static content and
// // set the cookie from the embedded app in the headers on all requests.
// embeddedApp.use(express.static('src', {
//     setHeaders: function (res, path, stat) {
//       res.set('Set-Cookie', "embeddedCookie=Hello from an embedded third party cookie!;Path=/;Secure;SameSite=None");
//     }
// }));

// // Create the server and start it.
// const embeddedServer = https.createServer({ key: embeddedKey, cert: embeddedCert }, embeddedApp);
// embeddedServer.listen(embeddedPort, () => {
//   console.log(`Embedded server now running on ${embeddedPort}...`)
// });