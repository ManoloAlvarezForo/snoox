
// Mongoose Models.
const Author = require('../models/author');
const Post = require('../models/post');

module.exports = {

    /**
     * Gets all authors from the Database.
     */
    all: async () => {
        return await Author.find({});
    },

    /**
     * Gets an Author element from the Database according the authorId.
     */
    getAuthorById: async (authorId) => {
        return await Author.findById(authorId);
    },

    /**
     * Adds the new author in the Db according the arguments.
     */
    addAuthor: async (args) => {
        const newAuthor = new Author({
            name: args.name,
            email: args.email
        });

        if (args.posts) {
            newAuthor.authors = await Post.create(args.posts);
        } 
        
        return await newAuthor.save();
    },

    /**
     * Gets the Post according the author id.
     */
    getPostsByAuthorId: async (authorId) => {
        const authorFounded = await Author.findById(authorId).populate('posts').exec();
        return authorFounded.posts;
    }
}

