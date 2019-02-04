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
    let applicantUpdated = { updated: false, applicant: {}}; 
    
    if(applincant !== null) {
        applicantUpdated.updated = true;
        applicantUpdated.applicant = await Applicant.findById(applicantToUpdate.id);
    }

    return applicantUpdated;
}

/**
 * Removes an Applicant using an Id.
 * 
 * @param {
 * } idToRemove 
 */
export const removeApplicantById = async (idToRemove) => {
    return await Applicant.findByIdAndRemove(idToRemove);
}