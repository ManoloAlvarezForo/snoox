const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const rootQuery = require('./queries/root-query');
const cors = require('cors');

//ssl https module and File System (fs)
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./ssl_cert/noox-key.pem'),
  cert: fs.readFileSync('./ssl_cert/noox-cert.pem')
};

//Declared app
const app = express();

//Db connection.
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/nsone');
const promise = mongoose.connect('mongodb://localhost/noox', {
    useMongoClient: true,
    /* other options */
});

// Create an express server and a GraphQL endpoint
app.use(cors());

app.use('/graphql', express_graphql({
    schema: rootQuery,
    graphiql: true
}));

// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
//Start the Server
const port = app.get('port') || 4000;
const https_port = 8443;

promise.then(function (db) {
    // app.listen(port, () => console.log(`GraphQL-Noox Server is listening on port ${port}`));
    https.createServer(options, app).listen(https_port, () =>  console.log(`GraphQL-Noox Server is listening on port ${https_port}`));
});