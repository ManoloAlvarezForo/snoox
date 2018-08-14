const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const dashboardSchema = new Schema({
    name: String,
    description: String,
    widgets: [{ type: Schema.Types.ObjectId, ref: 'widget'}]
});

module.exports = mongoose.model('dashboard', dashboardSchema);