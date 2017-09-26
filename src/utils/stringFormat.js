import moment from 'moment';
export const dateFormat = (dateString) => (
  dateString ?
    moment(dateString).format('MM/DD/YYYY') :
    ''
)
