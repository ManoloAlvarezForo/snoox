import Applicant from '../models/applicant';

export const getApplicants = async () => {
    return await Applicant.find({});
}

/**
 * Adds a new Applicant to the Database.
 */
export const addApplicant = async args => {
    const newApplicant = new Applicant({ ...args });
    const response = await newApplicant.save();
    return response;
}

/**
 * Gets a Applicant by id.
 */
export const getApplicantById = async id => {
    return await Applicant.findById(id);;
}

export const updateApplicantById = async (applicantToUpdate) => {
    const applincant = await Applicant.findByIdAndUpdate(applicantToUpdate.id, applicantToUpdate);
    let applicantUpdated = { updated: false, applicant: {} };

    if (applincant !== null) {
        applicantUpdated.updated = true;
        applicantUpdated.applicant = await Applicant.findById(applicantToUpdate.id);
    }

    return applicantUpdated;
}

export const getApplicantsByFilter = async (query) => {

    const regexToMatch = { $regex: new RegExp(query, 'ig') }
    const propertiesToMatch = [{ name: regexToMatch }, { lastName: regexToMatch }]

    if (query) {
        return await Applicant.aggregate([
            {
                $match:
                {
                    $or: propertiesToMatch
                }
            },
            {
                "$addFields": { "id": { "$toString": "$_id" } }
            }
        ]);
    } else {
        return await Applicant.find({})
    }
}

// Deprecated method to find a criteria
// TODO: Find a way to improve how to match a criteria if the property is part of another object
// export const getApplicantsByFilter = async (query, properties) => {

//     const regexToMatch = {$regex: new RegExp(query, 'ig')} 
//     const propertiesToMatch = properties.map(property => {
//         return {[property]: regexToMatch}
//     })


//     if (query) {
//         return await Applicant.aggregate([
//             {
//                 $match:
//                 {
//                     $or: propertiesToMatch
//                 }
//             },
//             {
//                 "$addFields": { "id": { "$toString": "$_id"}}
//             }
//         ]);
//     } else {
//       return  await Applicant.find({})
//     }

// }

/**
 * Removes an Applicant using an Id.
 * 
 * @param {
 * } idToRemove 
 */
export const removeApplicantById = async (idToRemove) => {
    return await Applicant.findByIdAndRemove(idToRemove);
}