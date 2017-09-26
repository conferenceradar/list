import React from 'react';
import { DateColumnWrapper } from './styles';
import { dateFormat } from '../utils/stringFormat';
const DateColumn = (start, end, keyColumn) => {
  if (!keyColumn) {
    return null;
  }

  return (
    <DateColumnWrapper>
      <small><strong>Start:</strong> {dateFormat(start)}</small>
      <small><strong>End:</strong> {dateFormat(end)}</small>
    </DateColumnWrapper>
  )
}

export default DateColumn;