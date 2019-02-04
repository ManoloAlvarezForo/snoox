import Route from '../models/route';

export const getRoutes = async () => {
    return await Route.find({});
}

/**
 * Adds a new Route to the Database.
 */
export const addRoute = async args => {
    const newRoute = new Route({ ...args });
    const response = await newRoute.save();
    return response;
}

/**
 * Gets a Route by id.
 */
export const getRouteById = async id => {
    return await Route.findById(id);;
}

export const updateRouteById = async (RouteToUpdate) => {
    const applincant = await Route.findByIdAndUpdate(RouteToUpdate.id, RouteToUpdate);
    let RouteUpdated = { updated: false, Route: {}}; 
    
    if(applincant !== null) {
        RouteUpdated.updated = true;
        RouteUpdated.Route = await Route.findById(RouteToUpdate.id);
    }

    return RouteUpdated;
}

/**
 * Removes an Route using an Id.
 * 
 * @param {
 * } idToRemove 
 */
export const removeRouteById = async (idToRemove) => {
    return await Route.findByIdAndRemove(idToRemove);
}