"use strict";
require("@babel/polyfill");
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _apolloServerExpress = require("apollo-server-express");
var _schemas = _interopRequireDefault(require("./graphql/schemas"));
var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// const jwt = require('express-jwt');
var fs = require('fs');
var https = require('https');
var http = require('http');
// const {getUserId} = require('./utils/utils')

var configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'apollo-serve.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' } };


var environment = process.env.NODE_ENV || 'development';
var config = configurations[environment];

var apollo = new _apolloServerExpress.ApolloServer({
  typeDefs: _schemas.default,
  resolvers: _resolvers.default });


var app = (0, _express.default)();
// const authMiddleware = jwt({
//     secret: 'GraphQL-is-aw3some',
//     credentialsRequired: true
// });
// app.use(authMiddleware);
apollo.applyMiddleware({ app: app });

// Create the HTTPS or HTTP server, per configuration
var server;
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
  {
    key: fs.readFileSync("./ssl_cert/noox-key.pem"),
    cert: fs.readFileSync("./ssl_cert/noox-cert.pem") },

  app);

} else {
  server = http.createServer(app);
}

// Add subscription support
apollo.installSubscriptionHandlers(server);

//Db connection.
_mongoose.default.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/nsone');
var promise = _mongoose.default.connect('mongodb://localhost/apolloDB', {
  useMongoClient: true
  /* other options */ });


// Create an express server and a GraphQL endpoint
// var app = express();
// app.use('/graphql', express_graphql({
//     schema: rootQuery,
//     graphiql: true
// }));

// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
//Start the Server
var port = app.get('port') || 4000;

promise.then(function (db) {
  server.listen({ port: port }, function () {return (
      console.log(
      '🚀 Server ready at', "http".concat(
      config.ssl ? 's' : '', "://").concat(config.hostname, ":").concat(config.port).concat(apollo.graphqlPath)));});


});