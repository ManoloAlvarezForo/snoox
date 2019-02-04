const Author = require('../models/author');

module.exports = {
    getAuthors: async () => {
        return await Author.find({});;
    },

    addAuthor: async (args) => {
        return await new Author({...args}).save();
    },

    getAuthorById: async (id) => {
        return await Author.findById(id);;
    }
}

