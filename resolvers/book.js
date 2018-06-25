const Book = require('../models/book');

module.exports = {
    getBooks: async () => {
        return await Book.find({});
    },

    addBook: async (args) => {
        return await new Book({...args}).save();
    },

    getBookById: async (id) => {
        return await Book.findById(args.id);
    },

    getBookByAuthorId: async (authorId) => {
        return await Book.find({authorId: authorId});
    },
}

