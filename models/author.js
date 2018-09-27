
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Author mongoose schema.
 */
const authorSchema = new Schema({
    name: String,
    email: String,
    website: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'post'}]
});

module.exports = mongoose.model('author', authorSchema);
