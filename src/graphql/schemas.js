import { gql } from 'apollo-server';

const schemas = gql`
type User {
    id: String,
    name: String,
    email: String
}

type ApplicantUpdatedOutput {
    applicant: Applicant,
    updated: Boolean
}

type ApplicantOutputPhone {
    number: String,
    label: String
}

type ApplicantOutputPhones {
    list: [ApplicantOutputPhone],
    keyName: String
}

type ApplicantOutputMail {
    mail: String,
    label: String
}

type ApplicantOutputMails {
    list: [ApplicantOutputMail],
    keyName: String
}

type ApplicantOutputAccount {
    account: String,
    label: String
}

type ApplicantOutputAccounts {
    list: [ApplicantOutputAccount],
    keyName: String
}

input ApplicantInputPhone {
    number: String,
    label: String
}

input ApplicantInputPhones {
    list: [ApplicantInputPhone],
    keyName: String
}

input ApplicantInputMail {
    mail: String,
    label: String
}

input ApplicantInputMails {
    list: [ApplicantInputMail],
    keyName: String
}

input ApplicantInputAccount {
    account: String,
    label: String
}

input ApplicantInputAccounts {
    list: [ApplicantInputAccount],
    keyName: String
}

input AplicantInput {
    id: String,
    name: String,
    lastName: String,
    avatar: String,
    phones: ApplicantInputPhones,
    mails: ApplicantInputMails,
    accounts: ApplicantInputAccounts,
    address: String,
    position: String,
}

input AplicantInputNew {
    name: String,
    lastName: String,
    avatar: String,
    phones: ApplicantInputPhones,
    mails: ApplicantInputMails,
    accounts: ApplicantInputAccounts,
    address: String,
    position: String,
}

type Applicant {
    id: String,
    name: String,
    lastName: String,
    avatar: String,
    phones: ApplicantOutputPhones,
    mails: ApplicantOutputMails,
    accounts: ApplicantOutputAccounts,
    address: String,
    position: String,
    country: String,
    source: String
}

type Query {
    users: [User]
    applicants: [Applicant]
    applicantById(id: String): Applicant
}

type AuthPayLoad {
    token: String
    user: User
}

input PointInput {
    lat: Float,
    lng: Float
}

type PointOutput {
    lat: Float,
    lng: Float
}

input RouteInput {
    owner: String,
    points: [PointInput],
    direction: String,
    routeNumber: String
}

type Route {
    id: String,
    owner: String,
    points: [PointOutput],
    direction: String,
    routeNumber: String
}

type Mutation {
    signup(email: String, password: String, name: String): AuthPayLoad
    login(email: String, password: String): AuthPayLoad
    addApplicant(applicant: AplicantInputNew): Applicant
    updateApplicant(applicantToUpdate: AplicantInput): ApplicantUpdatedOutput
    addRoute(route: RouteInput): Route
}
`;

export default schemas;