"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var AuthenticationResolver = _interopRequireWildcard(require("../resolvers/authentication"));
var UserResolver = _interopRequireWildcard(require("../resolvers/user"));
var ApplicantResolver = _interopRequireWildcard(require("../resolvers/applicant"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * Authorized message.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */
var AUTHORIZED_MESSAGE = 'You are not authorized!';

/**
                                                     * Evaluates if the user authenticated exists.
                                                     * 
                                                     * @param {User to be evaluated} user 
                                                     */
var validateAuthentication = function validateAuthentication(user) {
  if (!user) throw new Error(AUTHORIZED_MESSAGE);
};

var resolvers = {
  Query: {
    users: function users(_, args, context) {
      validateAuthentication(context.user);
      return UserResolver.getUsers();
    },
    applicants: function applicants(_, args, context) {
      // validateAuthentication(context.user);
      return ApplicantResolver.getApplicants();
    },
    applicantById: function applicantById(_, args, context) {
      // validateAuthentication(context.user);
      return ApplicantResolver.getApplicantById(args.id);
    } },

  Mutation: {
    signup: function signup(_, args) {
      return AuthenticationResolver.signup(args);
    },
    login: function login(_, args) {
      return AuthenticationResolver.login(args);
    },
    addApplicant: function addApplicant(_, args, context) {
      validateAuthentication(context);
      return ApplicantResolver.addApplicant(args);
    },
    updateApplicant: function updateApplicant(_, _ref, context) {var applicantToUpdate = _ref.applicantToUpdate;
      validateAuthentication(context);
      return ApplicantResolver.updateApplicantById(applicantToUpdate);
    } } };var _default =



resolvers;exports.default = _default;