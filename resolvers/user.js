const User = require('../models/user');

module.exports = {

    /**
     * Gets all Users from the Database.
     */
    getUsers: async () => {
        return await User.find({});
    },

    /**
     * Adds a new User to the Database.
     */
    addUser: async (args) => {
        const newUser = new User({...args});
        const response = await newUser.save();
        return response;
    },

    /**
     * Gets a user by id.
     */
    getUserById: async (id) => {
        return await User.findById(id);;
    },

    /**
     * Gets the user by email.
     */
    getUserByEmail: async (email) => {
        const userFound = await User.find({email: email});
        return userFound.length > 0 ? userFound[0] : null;
    }
}

