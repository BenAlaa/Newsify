import moment from 'moment';

export const trimString = (string='', length=0) => {
    console.log('length: ', length)
    console.log('string: ', string)
    length = length > string.length ? length: string.length;
    return `${string.substring(0, length)}...`;
}
export const dateFormater = (date) => {
    return moment(date).utc().format('DD-MM-YYYY HH:MM');
}