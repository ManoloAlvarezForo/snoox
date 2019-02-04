import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const routeSchema = new Schema({
    owner: String,
    points: [{lat: Number, lng: Number, _id: false}],
    direction: String,
    routeNumber: String
});

export default mongoose.model('route', routeSchema);;

