
// Mongoose Models.
const Post = require('../models/post');
const Author = require('../models/author');

module.exports = {

    /**
     * Gets all posts from the Database.
     */
    posts: async () => {
        return await Post.find({});
    },

    /**
     * Gets the count of post elements.
     */
    count: async () => {
        return await Post.count();
    },

    /**
     * Gets data related with pagination count, pages number and the posts elements.
     */
    getPaginatedData: async (offset, limit) => {
        const count = await Post.count();
        let pagesNumber = 1;

        if (count > limit) {
            pagesNumber = Math.ceil(count / limit);
        }

        const posts = await Post.find().skip(offset > 0 ? ((offset - 1) * limit) : 0).limit(limit);

        return {
            count,
            pagesNumber,
            posts
        }
    },

    /**
     * Gets post paginated by an Author id.
     */
    getPostsPaginatedByAuthorId: async (authorId, skip, limit) => {
        return await Post.find({ authorId: authorId }).skip(skip).limit(limit);
    },

    /**
     * Gets the paginated post elements according a offset and a limit.
     */
    getPostsPaginated: async (offset, limit) => {
        return await Post.find({}).skip(offset).limit(limit);
    },

    /**
     * Gets a post element according a post id.
     */
    getPostById: async (postId) => {
        return await Post.findById(postId);
    },

    /**
     * Gets post by a query filter.
     */
    getPostFilter: async (query) => {
        const regexValue = new RegExp(query, 'g');
        return await Post.aggregate([{ $match: { title: { $regex: regexValue } } }, { "$addFields": { "id": { "$toString": "$_id" } } }]);
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
            return newPost;

        } catch (error) {
            console.log('Error to add a post: [' + error.message + ']');
        }
    }
}

