const Item = require('../models/item');

module.exports = {
    getItems: async (args) => {
        const items = await Item.find({});
        return items;
    },

    newItem: async (args) => {
        const newItem = new Item(args.newItem);
        const item = await newItem.save();
        return item;
    },

    getItem: async (id) => {
        const item = await Item.findOne({itemId: id });
        return item;
    },

    replaceItem: async (args) => {
        const { itemId } = req.params;
        const newItem = res.body;
        const result = await Item.findByIdAndUpdate(itemId, newItem)
        return true;
    },

    updateItem: async (args) => {
        const { itemId } = req.params;
        const newItem = res.body;
        const result = await Item.findByIdAndUpdate(itemId, newItem)
        return true;
    }
}

