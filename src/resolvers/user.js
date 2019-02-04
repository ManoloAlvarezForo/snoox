import User from '../models/user'

export const getUsers = async () => {
    return await User.find({});
}

export const addUser = async args => {
    const newUser = new User({ ...args });
    const response = await newUser.save();
    return response;
}

export const getUserById = async id => {
    return await User.findById(id);;
}

export const getUserByEmail = async email => {
    const userFound = await User.find({ email: email });
    return userFound.length > 0 ? userFound[0] : null;
}