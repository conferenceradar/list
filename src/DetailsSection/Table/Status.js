import React from 'react';
import { statusColors } from '../../utils/colors';
const status = {
  cancelled: 'Cancelled',
  postponed: 'Postponed',
  happening: 'Happening',
  noInfo: 'No Information Available'
}

const Status = ({ rowData }) => {
  return <div style={{ display: 'flex'}}>
    <div style={{ width: 36, height: 36, minWidth: 36, minHeight: 36, backgroundColor: statusColors[rowData.status], marginRight: 8, borderRadius: '50%' }} />
    <a href={rowData.statusUrl || rowData.url} target="_blank" style={{ }}>{status[rowData.status]}</a>
    </div>
};

export default Status;
