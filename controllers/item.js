const Item = require('../models/item');

module.exports = {
    index: async (req, res, next) => {
        const items = await Item.find({});
        res.status(200).json(items);
    },

    newItem: async (req, res, next) => {
        const newItem = new Item(req.body);
        const item = await newItem.save();
        res.status(200).json(item);
    },

    getItem: async (req, res, next) => {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        res.status(200).json(item);
    },

    replaceItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newItem = res.body;
        const result = await Item.findByIdAndUpdate(itemId, newItem)
        res.status(200).json({ success: true });
    },

    updateItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newItem = res.body;
        const result = await Item.findByIdAndUpdate(itemId, newItem)
        res.status(200).json({ success: true });
    }
}

