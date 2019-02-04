import * as AuthenticationResolver from '../resolvers/authentication';
import * as UserResolver from '../resolvers/user';
import * as ApplicantResolver from '../resolvers/applicant';
import * as RouteResolver from '../resolvers/route';

/**
 * Authorized message.
 */
const AUTHORIZED_MESSAGE = 'You are not authorized!';

/**
 * Evaluates if the user authenticated exists.
 * 
 * @param {User to be evaluated} user 
 */
const validateAuthentication = (user) => {
  // if (!user) throw new Error(AUTHORIZED_MESSAGE)
}

const resolvers = {
  Query: {
    users(_, args, context) {
      validateAuthentication(context.user);
      return UserResolver.getUsers();
    },
    applicants(_, args, context) {
      // validateAuthentication(context.user);
      return ApplicantResolver.getApplicants();
    },
    applicantById(_, args, context) {
      // validateAuthentication(context.user);
      return ApplicantResolver.getApplicantById(args.id);
    }
  },
  Mutation: {
    signup(_, args) {
      return AuthenticationResolver.signup(args);
    },
    login(_, args) {
      return AuthenticationResolver.login(args);
    },
    addApplicant(_, {applicant}, context) {
      validateAuthentication(context);
      return ApplicantResolver.addApplicant(applicant);
    },
    updateApplicant(_, {applicantToUpdate}, context) {
      validateAuthentication(context);
      return ApplicantResolver.updateApplicantById(applicantToUpdate);
    },
    addRoute(_, {route}, context) {
      validateAuthentication(context);
      return RouteResolver.addRoute(route);
    }
  }
};

export default resolvers;