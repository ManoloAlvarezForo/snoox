"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _apolloServer = require("apollo-server");function _templateObject() {var data = _taggedTemplateLiteral(["\ntype User {\n    id: String,\n    name: String,\n    email: String\n}\n\ntype ApplicantOutputPhone {\n    number: String,\n    label: String\n}\n\ntype ApplicantOutputPhones {\n    list: [ApplicantOutputPhone],\n    keyName: String\n}\n\ntype ApplicantOutputMail {\n    mail: String,\n    label: String\n}\n\ntype ApplicantOutputMails {\n    list: [ApplicantOutputMail],\n    keyName: String\n}\n\ntype ApplicantOutputAccount {\n    account: String,\n    label: String\n}\n\ntype ApplicantOutputAccounts {\n    list: [ApplicantOutputAccount],\n    keyName: String\n}\n\ninput ApplicantInputPhone {\n    number: String,\n    label: String\n}\n\ninput ApplicantInputPhones {\n    list: [ApplicantInputPhone],\n    keyName: String\n}\n\ninput ApplicantInputMail {\n    mail: String,\n    label: String\n}\n\ninput ApplicantInputMails {\n    list: [ApplicantInputMail],\n    keyName: String\n}\n\ninput ApplicantInputAccount {\n    account: String,\n    label: String\n}\n\ninput ApplicantInputAccounts {\n    list: [ApplicantInputAccount],\n    keyName: String\n}\n\ninput AplicantInput {\n    id: String!,\n    name: String,\n    lastName: String,\n    avatar: String,\n    phones: ApplicantInputPhones,\n    mails: ApplicantInputMails,\n    accounts: ApplicantInputAccounts,\n    address: String,\n    position: String,\n}\n\ntype Applicant {\n    id: String!,\n    name: String,\n    lastName: String,\n    avatar: String,\n    phones: ApplicantOutputPhones,\n    mails: ApplicantOutputMails,\n    accounts: ApplicantOutputAccounts,\n    address: String,\n    position: String,\n    country: String,\n    source: String\n}\n\ntype Query {\n    users: [User]\n    applicants: [Applicant]\n    applicantById(id: String): Applicant\n}\n\ntype AuthPayLoad {\n    token: String\n    user: User\n}\n\ntype Mutation {\n    signup(email: String, password: String, name: String): AuthPayLoad\n    login(email: String, password: String): AuthPayLoad\n    addApplicant(name: String, lastName: String, avatar: String, phones: ApplicantInputPhones, mails: ApplicantInputMails, accounts: ApplicantInputAccounts, address: String, position: String): Applicant\n    updateApplicant(applicantToUpdate: AplicantInput): Applicant\n}\n"]);_templateObject = function _templateObject() {return data;};return data;}function _taggedTemplateLiteral(strings, raw) {if (!raw) {raw = strings.slice(0);}return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}

var schemas = (0, _apolloServer.gql)(_templateObject());var _default =















































































































schemas;exports.default = _default;