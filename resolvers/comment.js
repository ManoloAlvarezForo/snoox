
// Mongoose Models.
const Post = require('../models/post');
const CommentModel = require('../models/comment');

module.exports = {

    /**
     * Gets all posts from the Database.
     */
    comments: async () => {
        return await CommentModel.find({});
    },

    /**
     * Adds the new post in the Db according the arguments.
     */
    addComment: async (args) => {
        let modelFounded = {};
        try {
            (args.isToPost) ? 
            modelFounded = await Post.findById(args.parentId) : 
            modelFounded = await CommentModel.findById(args.parentId);

            const newComment = new CommentModel({
                parentId: args.parentId,
                name: args.name,
                email: args.email,
                body: args.body,
                isToPost: args.isToPost ? true : false
            });
           
            await newComment.save();
            modelFounded.comments.push(newComment);
            await modelFounded.save();

            return newComment;
        } catch (error) {
            console.log('Error to add a comment: [' + error.message + ']');
        }
    },

    
    /**
     * Gets the Post according the author id.
     */
    getCommentsByParentId: async (parentId, isToPost) => {
        let modelFounded = {};
        (isToPost) ? 
        modelFounded = await Post.findById(parentId).populate('comments').exec() :
        modelFounded = await CommentModel.findById(parentId).populate('comments').exec()

        return (modelFounded !== null) ? modelFounded.comments: new Error("Comment not found.");
    }
}

