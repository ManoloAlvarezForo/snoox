const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const productSchema = new Schema({
    name: String,
    productId: Number,
    description: String,
    price: {type: Number, default: 0.0},
    availableAmmount: { type: String, default: 0 },
    category: { type: String, enum: ['LAB', 'SOMB', 'MAQUI'] },
    images: [String]
});

module.exports = mongoose.model('product', productSchema);