const Widget = require('../models/Widget');

module.exports = {
    getWidgets: async () => {
        return await Widget.find({});
    },

    addWidget: async (args) => {
        return await new Widget({...args}).save();
    },

    getWidgetById: async (id) => {
        return await Widget.findById(args.id);
    },

    getWidgetsByDashboardId: async (authorId) => {
        return await Widget.find({authorId: authorId});
    },
}

