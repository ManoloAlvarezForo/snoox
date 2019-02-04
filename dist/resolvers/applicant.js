"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.removeApplicantById = exports.updateApplicantById = exports.getApplicantById = exports.addApplicant = exports.getApplicants = void 0;var _applicant = _interopRequireDefault(require("../models/applicant"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var getApplicants = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              _applicant.default.find({}));case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));return function getApplicants() {return _ref.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                               * Adds a new Applicant to the Database.
                                                                                                                                                                                                                                               */exports.getApplicants = getApplicants;
var addApplicant = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {var newApplicant, response;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            newApplicant = new _applicant.default(_objectSpread({}, args));_context2.next = 3;return (
              newApplicant.save());case 3:response = _context2.sent;return _context2.abrupt("return",
            response);case 5:case "end":return _context2.stop();}}}, _callee2, this);}));return function addApplicant(_x) {return _ref2.apply(this, arguments);};}();


/**
                                                                                                                                                                       * Gets a Applicant by id.
                                                                                                                                                                       */exports.addApplicant = addApplicant;
var getApplicantById = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              _applicant.default.findById(id));case 2:return _context3.abrupt("return", _context3.sent);case 4:case "end":return _context3.stop();}}}, _callee3, this);}));return function getApplicantById(_x2) {return _ref3.apply(this, arguments);};}();exports.getApplicantById = getApplicantById;


var updateApplicantById = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(applicantToUpdate) {var response;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              _applicant.default.findByIdAndUpdate(applicantToUpdate.id, applicantToUpdate));case 2:response = _context4.sent;return _context4.abrupt("return",
            response);case 4:case "end":return _context4.stop();}}}, _callee4, this);}));return function updateApplicantById(_x3) {return _ref4.apply(this, arguments);};}();


/**
                                                                                                                                                                               * Removes an Applicant using an Id.
                                                                                                                                                                               * 
                                                                                                                                                                               * @param {
                                                                                                                                                                               * } idToRemove 
                                                                                                                                                                               */exports.updateApplicantById = updateApplicantById;
var removeApplicantById = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(idToRemove) {return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              _applicant.default.findByIdAndRemove(idToRemove));case 2:return _context5.abrupt("return", _context5.sent);case 3:case "end":return _context5.stop();}}}, _callee5, this);}));return function removeApplicantById(_x4) {return _ref5.apply(this, arguments);};}();exports.removeApplicantById = removeApplicantById;