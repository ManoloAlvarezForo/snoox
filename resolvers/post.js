
// Mongoose Models.
const Post = require('../models/post');
const Author = require('../models/author');

module.exports = {

    /**
     * Gets all posts from the Database.
     */
    posts: async () => {
        console.log('[Server]: Get Posts Resolver method was called.')
        return await Post.find({});
    },

    /**
     * Gets post paginated by an Author id.
     */
    getPostsPaginatedByAuthorId: async (authorId, skip, limit) => {
        return await Post.find({authorId: authorId}).skip(skip).limit(limit);
    },

    /**
     * Gets post by a query filter.
     */
    getPostFilter: async (query) => {
        const regexValue = new RegExp(query, 'g');
        const response = await Post.aggregate([{ $match: {  title: { $regex: regexValue}}}]);
        
        return response;
    },

    /**
     * Adds the new post in the Db according the arguments.
     */
    addPost: async (args) => {

        try {
            const authorFounded = await Author.findById(args.authorId);
            const newPost = new Post({
                authorId: args.authorId,
                title: args.title,
                body: args.body
            });

            if (args.comments) {
                newPost.comments = await Post.create(args.comments);
            }

            await newPost.save();
            authorFounded.posts.push(newPost);
            await authorFounded.save();
            console.log(`Post: \n${newPost} \nAdded succesfully.`)
            return newPost;

        } catch (error) {
            console.log('Error to add a post: [' + error.message + ']');
        }
    },

    /**
     * Searchs in the 
     */
    search: async(query) => {

    }
}

