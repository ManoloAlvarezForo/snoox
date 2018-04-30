const Book = require('../models/book');

module.exports = {
    getBooks: async () => {
        return await Book.find({});;
    },

    addBook: async (args) => {
        return await new Book({...args}).save();
    },

    getBookById: async (id) => {
        return await Book.findById(args.id);
    },

    // replaceBook: async (parent, args) => {
    //     const { bookId } = req.params;
    //     const newBook = res.body;
    //     const result = await Book.findByIdAndUpdate(bookId, newBook)
    //     return true;
    // },

    // updateBook: async (parent, args) => {
    //     const { bookId } = req.params;
    //     const newBook = res.body;
    //     const result = await Book.findByIdAndUpdate(bookId, newBook)
    //     return true;
    // }
}

