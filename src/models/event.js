import mongoose from 'mongoose';
import moment from 'moment'

const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const eventSchema = new Schema({
    title: String,
    date: String,
    timeFrom: String,
    timeTo: String,
    location: String,
    participants:[{ type: Schema.Types.ObjectId, ref: 'applicant' }],
    description: String,
    createdDate: { type: String, default: moment().format()}
});

export default mongoose.model('event', eventSchema);;

