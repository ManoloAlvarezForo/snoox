const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);