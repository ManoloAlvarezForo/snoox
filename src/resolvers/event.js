import Event from '../models/event';
import {getStartAndEndDateFromMonth} from '../utils/CalendarUtil'
import moment from 'moment';

/**
 * Gets All events.
 */
export const getEvents = async () => {
    return await Event.find({});
}

/**
 * Gets Events by a Date from and a Date to.
 * 
 * @param {String} from Date to specifies the from. 
 * @param {String} to Date to specifies the to.
 */
export const getEventsByDate = async (from, to) => {
    let response = [];
    let fromDate = moment(from)
    let toDate = moment(to)

    while (!moment(fromDate).isAfter(toDate)) {
        let newDate = {date: fromDate.format('YYYY-MM-DD'), events: []};
        let auxDate = await Event.find({ date: fromDate.format('YYYY-MM-DD') })
        if (auxDate.length !== 0) {
            newDate.events = newDate.events.concat(auxDate)
            response.push(newDate);
        }

        fromDate.add(1, 'days');
    }

    return response;
}

/**
 * Gets the events by month and year date also use the locale and the days per month to calculate the events.
 * 
 * @param {String} month Month number to be used to find Events.
 * @param {String} year Year number to be used to find Events.
 * @param {String} locale Locale to handle Dates according the locale.
 * @param {String} daysPerMonth Days per month to extra days.
 */
export const getCalendarEventsByMonth = async (month, year, locale, daysPerMonth) => {
    const calendarUtil = getStartAndEndDateFromMonth(month, year, locale, daysPerMonth);
    const from = calendarUtil.startDate;
    const to = calendarUtil.endDate;
    let response = [];

    while (!moment(from).isAfter(to)) {
        
        let auxDate = await Event.find({ date: from.format('YYYY-MM-DD') })
        if (auxDate.length !== 0) {
            let dayAux = {date: from.format('YYYY-MM-DD'), events: []}
            dayAux.events = dayAux.events.concat(auxDate)
            response.push(dayAux)
        }
        
        from.add(1, 'days');
    }

    return response;
}

/**
 * Adds the new Event based in the arguments.
 * 
 * @param {Object} args Contanis the arguments to be added in the new intem. 
 */
export const addEvent = async args => {
    const newEvent = new Event({ ...args });
    const response = await newEvent.save();
    return response;
}

/**
 * Gets an Event according the id.
 * 
 * @param {String} id ID to be used to fing the Event.
 */
export const getEventById = async id => {
    return await Event.findById(id);;
}

/**
 * Updates the Events using the Event Object to update.
 * 
 * @param {Object} EventToUpdate 
 */
export const updateEventById = async (EventToUpdate) => {
    const event = await Event.findByIdAndUpdate(EventToUpdate.id, EventToUpdate);
    let eventUpdated = { updated: false, Event: {}}; 
    
    if(event !== null) {
        eventUpdated.updated = true;
        eventUpdated.Event = await Event.findById(EventToUpdate.id);
    }

    return eventUpdated;
}

/**
 * Removes an Event using an Id.
 * 
 * @param {
 * } idToRemove 
 */
export const removeEventById = async (idToRemove) => {
    return await Event.findByIdAndRemove(idToRemove);
}