"use strict";function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var Book = require('../models/book');

module.exports = {
  getBooks: function () {var _getBooks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                Book.find({}));case 2:return _context.abrupt("return", _context.sent);case 4:case "end":return _context.stop();}}}, _callee, this);}));function getBooks() {return _getBooks.apply(this, arguments);}return getBooks;}(),


  addBook: function () {var _addBook = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                new Book(_objectSpread({}, args)).save());case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function addBook(_x) {return _addBook.apply(this, arguments);}return addBook;}(),


  getBookById: function () {var _getBookById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                Book.findById(args.id));case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function getBookById(_x2) {return _getBookById.apply(this, arguments);}return getBookById;}()


  // replaceBook: async (parent, args) => {
  //     const { bookId } = req.params;
  //     const newBook = res.body;
  //     const result = await Book.findByIdAndUpdate(bookId, newBook)
  //     return true;
  // },

  // updateBook: async (parent, args) => {
  //     const { bookId } = req.params;
  //     const newBook = res.body;
  //     const result = await Book.findByIdAndUpdate(bookId, newBook)
  //     return true;
  // }
};