import moment from 'moment';

const DEAFAULT_DAYS_PER_MONTH = 35;

export const getStartAndEndDateFromMonth = (month, year, locale, daysPerMonth = DEAFAULT_DAYS_PER_MONTH) => {
    let now = moment();
    now.locale(locale);
    now.set('month', month);
    now.set('year', year);
    const myMoment = now.clone().set({'date': 1});
    const daysInMonth = myMoment.daysInMonth();
    const weekDay = parseInt(myMoment.format('d'));
    const startDate = myMoment.subtract(weekDay, 'days');
    const otherMoment = now.set({'date': daysInMonth});
    const endDate = otherMoment.add((daysPerMonth - daysInMonth) - weekDay, 'days');

    return {
        startDate: startDate,
        endDate: endDate
    }
}