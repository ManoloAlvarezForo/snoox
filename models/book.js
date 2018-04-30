const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    author: { type: Schema.Types.ObjectId, ref: 'author'}
});

const Route = mongoose.model('book', bookSchema);
module.exports = Route