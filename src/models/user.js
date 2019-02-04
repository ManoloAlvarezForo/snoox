import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * User mongoose schema.
 */
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

export default mongoose.model('user', userSchema);;

