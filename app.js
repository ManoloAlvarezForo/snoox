const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');
const items = require('./routes/items')

//ssl
var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./ssl_cert/noox-key.pem'),
  cert: fs.readFileSync('./ssl_cert/noox-cert.pem')
};

//Db connection.
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/nsone');
var promise = mongoose.connect('mongodb://localhost/noox', {
    useMongoClient: true,
    /* other options */
  });


//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
    next();
});

//Routes
// app.use('/users', users);
app.use('/items', items);

//Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Request not Found');
    err.status = 404;
    next(err);
});


//Error handler exception
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err: {};
    const status = err.status || 500;

    //Response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});

//Start the Server
const port = app.get('port') || 3001;

promise.then(function(db) {
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
    // https.createServer(options, app).listen(8443);
    // /* Use `db`, for instance `db.model()`
    
    // Create an HTTP service.
    // http.createServer(app).listen(port, () => console.log(`Server is listening on port ${port}`));
    // Create an HTTPS service identical to the HTTP service.
    // https.createServer(options, app).listen(8443);
  });
