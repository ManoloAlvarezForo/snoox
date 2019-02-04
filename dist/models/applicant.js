"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var Schema = _mongoose.default.Schema;

/**
                                        * Applicant mongoose schema.
                                        */
var applicantSchema = new Schema({
  name: String,
  avatar: { type: String, default: 'none' },
  lastName: String,
  phones: { list: [{ _id: false, number: { type: String }, label: { type: String } }], keyName: { type: String, default: 'number' } },
  mails: { list: [{ _id: false, mail: { type: String }, label: { type: String } }], keyName: { type: String, default: 'mail' } },
  accounts: { list: [{ _id: false, account: { type: String }, label: { type: String } }], keyName: { type: String, default: 'account' } },
  address: String,
  position: String,
  country: String,
  source: String });var _default =


_mongoose.default.model('applicant', applicantSchema);exports.default = _default;