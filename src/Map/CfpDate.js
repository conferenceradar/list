import DateColumn from './DateColumn';

const CfpDate = ({ rowData }) => (
  DateColumn(rowData.cfpStartDate, rowData.cfpEndDate, rowData.cfpEndDate)
);

export default CfpDate;
