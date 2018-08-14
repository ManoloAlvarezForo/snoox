const User = require("../models/user");
const AuthenticationResolver = require("../resolvers/authentication");

module.exports = {
  /**
   * Login user using the resolver.
   */
  login: async (req, res, next) => {
    const {email, password } = req.body;
    const response = await AuthenticationResolver.login({email, password});
    res.status(200).json(response);
  },

  /**
   * Sign up a user using the resolver.
   */
  signup: async (req, res, next) => {
    const {name, email, password } = req.body;
    const response = await AuthenticationResolver.signup({name, email, password});
    res.status(200).json(response);
  }
};
