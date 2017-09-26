import React from 'react';
import { LocationWrapper } from './styles';

const Location = ({ rowData }) => (
  <LocationWrapper>
    <small>{rowData.city} {rowData.stateProvince}</small>
    <small>{rowData.country}</small>
  </LocationWrapper>
)

export default Location;