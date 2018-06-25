const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Author Schema model.
 */
const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('author', authorSchema);