"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var Schema = _mongoose.default.Schema;

/**
                                        * User mongoose schema.
                                        */
var userSchema = new Schema({
  name: String,
  email: String,
  password: String });var _default =


_mongoose.default.model('user', userSchema);exports.default = _default;;