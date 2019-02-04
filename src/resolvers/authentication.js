import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/utils'; 
import * as UserResolver from '../resolvers/user';

const createToken = user => {
    return jwt.sign({ userId: user.id }, APP_SECRET);
}

export const login = async args => {
    const user = await UserResolver.getUserByEmail(args.email)

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
}

/**
   * Resolver to create an new User.
   */
export const signup = async args => {

    //Validates if he email of the new user exist and throw an error.
    const userFound = await UserResolver.getUserByEmail(args.email)
    if (userFound) {
        throw new Error('This user exist');
    }

    //encrypt the password.
    const cryptPassword = await bcrypt.hash(args.password, 10)

    //Create the new user.
    const user = await UserResolver.addUser({
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

