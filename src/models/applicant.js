import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Applicant mongoose schema.
 */
const applicantSchema = new Schema({
    name: String,
    avatar: { type: String, default: 'none' },
    lastName: String,
    phones: { list: [{ _id: false, number: { type: String }, label: { type: String } }], keyName: { type: String, default: 'number' } },
    mails: { list: [{ _id: false, mail: { type: String }, label: { type: String } }], keyName: { type: String, default: 'mail' } },
    accounts: {list: [{ _id: false, account: { type: String }, label: { type: String }}], keyName: { type: String, default: 'account' }},
    address: String,
    position: String,
    country: String,
    source: String
});

export default mongoose.model('applicant', applicantSchema);
