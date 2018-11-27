const Product = require('../models/Product');

module.exports = {

    /**
     * Gets all Products from the Database.
     */
    getAllProducts: async () => {
        return await Product.find({});
    },

    /**
     * Adds a new Product to the Database.
     */
    addProduct: async (args) => {
        const newProduct = new Product({...args});
        const response = await newProduct.save();
        return response;
    },

    /**
     * Gets a Product by id.
     */
    getProductById: async (id) => {
        return await Product.findById(id);;
    }
}

