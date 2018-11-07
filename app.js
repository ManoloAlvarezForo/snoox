const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const rootQuery = require('./queries/root-query');
const cors = require('cors');
const jwt = require('express-jwt');
const AuthenticationRoute = require('./routes/authentication');
const bodyParser = require('body-parser');

// ssl https module and File System (fs)
var https = require('https');

// fs plugin to read files
var fs = require('fs');

// SSL Options adding the key and certificate generated.
var options = {
    key: fs.readFileSync('./ssl_cert/noox-key.pem'),
    cert: fs.readFileSync('./ssl_cert/noox-cert.pem')
};

// Declared app
const app = express();

// Db connection.
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/nsone');
const promise = mongoose.connect('mongodb://localhost/kisses', {
    //other options
});

// Using body parser to body responses.
app.use(bodyParser.json());

// 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Rest route for authentication.
app.use('/authenticate', AuthenticationRoute);

// Authentication middleware for GraphQL.
const authMiddleware = jwt({
    secret: 'GraphQL-is-aw3some',
    credentialsRequired: false
});

// Cors for requests that are not in the same domain in production this shold be removed
// and the backend and frontend shold be in the same site.
app.use(cors());

// GraphQL Middleware for requests.
app.use(authMiddleware);

// Create an express server and a GraphQL endpoint.
app.use('/graphql', express_graphql(req => ({
    schema: rootQuery,
    graphiql: true,
    context: {
        user: req.user
    }
})));

// HTTP port.
const port = app.get('port') || 4000;

// HTTPS port.
const https_port = 8443;

//Start the Server.
promise.then(function (db) {
    app.listen(port, () => console.log(`GraphQL Http Server is listening on port ${port}`));
    // Uncomment above code code to enable https for the server.
    // https.createServer(options, app).listen(https_port, () =>  console.log(`SECURE GraphQL Https Server is listening on port ${https_port}`));
});