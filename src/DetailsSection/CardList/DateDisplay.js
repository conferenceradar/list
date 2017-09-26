import React from 'react';
import { dateFormat } from '../../utils/stringFormat';
import { DateWrapper } from './styles';

const DateDisplay = ({start, end, title}) => {
  if (!start) {
    return null;
  }

  return (
    <DateWrapper>
      <small>{dateFormat(start)}</small>
      <small>{dateFormat(end)}</small>
    </DateWrapper>
  )
}

export default DateDisplay;