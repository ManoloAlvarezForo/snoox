const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const widgetSchema = new Schema({
    name: String,
    description: String,
    height: Number,
    width: Number
});

module.exports = mongoose.model('widget', widgetSchema);