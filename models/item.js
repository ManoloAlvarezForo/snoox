const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    description: String
});

const Route = mongoose.model('item', itemSchema);
module.exports = Route