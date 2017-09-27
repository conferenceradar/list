import React from 'react';
import DateColumn from './DateColumn';

const CfpDate = ({ rowData }) => {
  const content = DateColumn(rowData.cfpStartDate, rowData.cfpEndDate, rowData.cfpEndDate);
  return rowData.cfpUrl ? (
    <a href={rowData.cfpUrl} target="_blank">{content}</a>
  ) : content;
};

export default CfpDate;
