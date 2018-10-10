
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Comment mongoose schema.
 */
const commentSchema = new Schema({
    postId: String,
    name: String,
    email: String,
    body: String
});

module.exports = mongoose.model('comment', commentSchema);




// "postId": 1,
// "id": 1,
// "name": "id labore ex et quam laborum",
// "email": "Eliseo@gardner.biz",
// "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"