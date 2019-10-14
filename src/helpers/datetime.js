import moment from 'moment';

export function formatDateTime(date){
    if(!date) return;

    var datetime = moment(date);
    return datetime.local().startOf('day').fromNow().toUpperCase();
}