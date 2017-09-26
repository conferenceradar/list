import React from 'react';
import { plugins, utils } from 'griddle-react';
import { CardWrapper } from './styles';
import DateDisplay from './DateDisplay';
const { connect } = utils;

const CustomRowComponent = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}))(({ rowData }) => (
  <CardWrapper className="box">
    <h1>{rowData.name}</h1>
    <ul>
    <li>{rowData.city} {rowData.stateProvince}</li>
    <li>{rowData.country}</li>
    </ul>
    <DateDisplay
      start={rowData.eventStartDate}
      end={rowData.eventEndDate}
      title="Event Date"
    />
    <a href={rowData.url}>{rowData.url}</a>
  </CardWrapper>
));

export default CustomRowComponent;