const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const rootQuery = require('./routes/root-query');

//Db connection.
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/nsone');
var promise = mongoose.connect('mongodb://localhost/noox', {
    useMongoClient: true,
    /* other options */
});

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: rootQuery,
    graphiql: true
}));

// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
//Start the Server
const port = app.get('port') || 4000;

promise.then(function (db) {
    app.listen(port, () => console.log(`GraphQL-Noox Server is listening on port ${port}`));
});