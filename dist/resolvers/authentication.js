"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.signup = exports.login = void 0;var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _utils = require("../utils/utils");
var UserResolver = _interopRequireWildcard(require("../resolvers/user"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var createToken = function createToken(user) {
  return _jsonwebtoken.default.sign({ userId: user.id }, _utils.APP_SECRET);
};

var login = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {var user, valid;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              UserResolver.getUserByEmail(args.email));case 2:user = _context.sent;if (

            user) {_context.next = 5;break;}throw (
              new Error('No such user found'));case 5:_context.next = 7;return (


              _bcryptjs.default.compare(args.password, user.password));case 7:valid = _context.sent;if (

            valid) {_context.next = 10;break;}throw (
              new Error('Invalid password'));case 10:return _context.abrupt("return",


            {
              token: createToken(user),
              user: user });case 11:case "end":return _context.stop();}}}, _callee, this);}));return function login(_x) {return _ref.apply(this, arguments);};}();



/**
                                                                                                                                                                      * Resolver to create an new User.
                                                                                                                                                                      */exports.login = login;
var signup = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {var userFound, cryptPassword, user, token;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (


              UserResolver.getUserByEmail(args.email));case 2:userFound = _context2.sent;if (!
            userFound) {_context2.next = 5;break;}throw (
              new Error('This user exist'));case 5:_context2.next = 7;return (



              _bcryptjs.default.hash(args.password, 10));case 7:cryptPassword = _context2.sent;_context2.next = 10;return (


              UserResolver.addUser({
                name: args.name,
                email: args.email,
                password: cryptPassword }));case 10:user = _context2.sent;


            //Create the user token.
            token = _jsonwebtoken.default.sign({ userId: user.id }, _utils.APP_SECRET);return _context2.abrupt("return",

            {
              token: token,
              user: user });case 13:case "end":return _context2.stop();}}}, _callee2, this);}));return function signup(_x2) {return _ref2.apply(this, arguments);};}();exports.signup = signup;