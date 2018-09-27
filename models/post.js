
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Post mongoose schema.
 */
const postSchema = new Schema({
    title: String,
    body: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model('post', postSchema);


// "userId": 1,
// "id": 1,
// "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
// "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"