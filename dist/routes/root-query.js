"use strict";function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var graphql = require('graphql');var
GraphQLObjectType = graphql.GraphQLObjectType,GraphQLSchema = graphql.GraphQLSchema,GraphQLID = graphql.GraphQLID,GraphQLString = graphql.GraphQLString;var _require =
require('../schemas/book'),BookFields = _require.BookFields,BookMutations = _require.BookMutations;var _require2 =
require('../schemas/author'),AuthorFields = _require2.AuthorFields,AuthorMutations = _require2.AuthorMutations;

var RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: _objectSpread({},
  BookFields,
  AuthorFields) });



var Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: _objectSpread({},
  BookMutations,
  AuthorMutations) });



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations });