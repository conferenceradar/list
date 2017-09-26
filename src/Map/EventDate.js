import DateColumn from './DateColumn';

const EventDate = ({ rowData }) => (
  DateColumn(rowData.eventStartDate, rowData.eventEndDate, rowData.eventStartDate)
);

export default EventDate;
