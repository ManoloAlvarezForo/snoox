
import "@babel/polyfill";
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';

// const jwt = require('express-jwt');
const fs = require('fs');
const https = require('https');
const http = require('http');
// const {getUserId} = require('./utils/utils')

const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'apollo-serve.com' },
    development: { ssl: false, port: 4000, hostname: 'localhost' }
}

const environment = process.env.NODE_ENV || 'development'
const config = configurations[environment]

const apollo = new ApolloServer({
    typeDefs: schemas,
    resolvers: resolvers
})

const app = express();
// const authMiddleware = jwt({
//     secret: 'GraphQL-is-aw3some',
//     credentialsRequired: true
// });
// app.use(authMiddleware);
apollo.applyMiddleware({ app })

// Create the HTTPS or HTTP server, per configuration
var server
if (config.ssl) {
    // Assumes certificates are in .ssl folder from package root. Make sure the files
    // are secured.
    server = https.createServer(
        {
            key: fs.readFileSync(`./ssl_cert/noox-key.pem`),
            cert: fs.readFileSync(`./ssl_cert/noox-cert.pem`)
        },
        app
    )
} else {
    server = http.createServer(app)
}

// Add subscription support
apollo.installSubscriptionHandlers(server)

//Db connection.
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/nsone');
var promise = mongoose.connect('mongodb://localhost/apolloDB', {
    useMongoClient: true,
    /* other options */
});

// Create an express server and a GraphQL endpoint
// var app = express();
// app.use('/graphql', express_graphql({
//     schema: rootQuery,
//     graphiql: true
// }));

// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
//Start the Server
const port = app.get('port') || 4000;

promise.then(function (db) {
    server.listen({ port }, () =>
        console.log(
            '🚀 Server ready at',
            `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
        )
    )
});


