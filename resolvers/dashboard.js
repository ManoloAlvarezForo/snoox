const Dashboard = require('../models/Dashboard');
const Widget = require('../models/Widget');

module.exports = {
    getDashboards: async () => {
        return await Dashboard.find({});
    },

    addDashboard: async (args) => {
        const newDashboard = new Dashboard({
            name: args.name,
            description: args.description
        });

        newDashboard.widgets = await Widget.create(args.widgets);
        
        return await newDashboard.save();
    },

    getWidgetsByDashboardId: async (id) => {
        const foundDashboard = await Dashboard.findById(id).populate('widgets').exec();
        return foundDashboard.widgets;
    }
}

