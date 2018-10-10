
// Mongoose Models.
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {

    /**
     * Gets all posts from the Database.
     */
    comments: async () => {
        return await Comment.find({});
    },

    /**
     * Adds the new post in the Db according the arguments.
     */
    addComment: async (args) => {

        try {
            const postFounded = await Post.findById(args.postId);
            const newComment = new Comment({
                postId: args.postId,
                name: args.name,
                email: args.email,
                body: args.body
            });
           
            await newComment.save();
            postFounded.comments.push(newComment);
            await postFounded.save();
            console.log(`Comment: \n${newComment} \nAdded succesfully.`)
            return newComment;

        } catch (error) {
            console.log('Error to add a comment: [' + error.message + ']');
        }
    },

    /**
     * Gets the Post according the author id.
     */
    getCommentsByPostId: async (postId) => {
        const postFounded = await Post.findById(postId).populate('comments').exec();
        return (postFounded !== null) ? postFounded.comments: new Error("Post not found.");
    }
}

