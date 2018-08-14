const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils/utils')
const UserController = require('../resolvers/user');

const createToken = user => {
    return jwt.sign({ userId: user.id }, APP_SECRET);
}

module.exports = {

    /**
     * Resolver to Login the User.
     */
    login: async (args) => {
        const user = await UserController.getUserByEmail(args.email)

        if (!user) {
            throw new Error('No such user found')
        }

        const valid = await bcrypt.compare(args.password, user.password)

        if (!valid) {
            throw new Error('Invalid password')
        }

        return {
            token: createToken(user),
            user,
        }
    },
    
    /**
     * Resolver to create an new User.
     */
    signup: async (args) => {

        //Validates if he email of the new user exist and throw an error.
        const userFound = await UserController.getUserByEmail(args.email)
        if (userFound) {
            throw new Error('This user exist');
        }
        
        //encrypt the password.
        const cryptPassword = await bcrypt.hash(args.password, 10)

        //Create the new user.
        const user = await UserController.addUser({
            name: args.name,
            email: args.email,
            password: cryptPassword
        });

        //Create the user token.
        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        return {
            token,
            user,
        }
    }
}

