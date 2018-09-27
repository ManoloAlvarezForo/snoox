
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
     * Adds the new post in the Db according the arguments.
     */
    addPost: async (args) => {

        try {
            const authorFounded = await Author.findById(args.authorId);
            const newPost = new Post({
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
     * Gets the Post according the author id.
     */
    getCommentsByPostId: async (postId) => {
        const postFounded = await Post.findById(postId).populate('comments').exec();
        return postFounded.comments;
    }
}

