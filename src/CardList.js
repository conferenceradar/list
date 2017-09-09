import React, { Component } from 'react';
import styled from 'styled-components';
import NoResults from './NoResults';
import PropTypes from 'prop-types';

import Griddle, { plugins, utils } from 'griddle-react';
const { connect } = utils;

const CardWrapper = styled.div`
  margin: 0 10px 0 10px;

  h1 {
    font-weight: bold;
    font-size: 16px;
  }
`

const ListWrapper = styled.div`
`

const CenteredPagination = styled.div`
  width: 100%;
  text-align: center;
  margin: 25px 0 25px 0;
`

const GriddleWrapper = styled.div`
  margin-bottom: 120px;

  .button {
    margin: 0 10px 0 10px;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  margin: 10px;

  @media(max-width: 640px) {
    button {
      display: none;
    }
  }

`

const Left = styled.div`
  width: 50%;
`
const Right = styled.div`
  width: 50%;
  text-align: right;
  padding-right: 20px;
`

const CustomRowComponent = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}))(({ rowData }) => (
  <CardWrapper className="box">
    <h1>{rowData.name}</h1>
    <ul>
    <li>{rowData.city} {rowData.stateProvince}</li>
    <li>{rowData.country}</li>
    </ul>

    <a href={rowData.url}>{rowData.url}</a>
  </CardWrapper>
));

// HoC for overriding Table component to just render the default TableBody component
// We could use this entirely if we wanted and connect and map over visible rows but 
// Using this + tableBody to take advantange of code that Griddle LocalPlugin already has
const CustomTableComponent = OriginalComponent => class CustomTableComponent extends Component {
  static contextTypes = {
    components: PropTypes.object
  }

  render() {
    return <this.context.components.TableBody />
  }
}

const CustomTableBody = ({ rowIds, Row, className }) => console.log('HERE ', rowIds) || (
  <ListWrapper>
    { (!rowIds || rowIds.size === 0) && <NoResults /> }
    { rowIds && rowIds.map(r => <Row key={r} griddleKey={r} />) }
  </ListWrapper>
);

const Layout = ({ Table, Pagination, Filter }) => (
  <GriddleWrapper>
    <TopWrapper>
      <Left>
        <Filter />
      </Left>
      <Right>
        <Pagination />
      </Right>
    </TopWrapper>
    <Table />
    <CenteredPagination>
      <Pagination />
    </CenteredPagination>
  </GriddleWrapper>
);

const getRange = (number) => {
  return Array(number).fill().map((_, i) => i + 1);
 }
 
 class PageDropdown extends Component {
   setPage = (e) => {
     this.props.setPage(parseInt(e.target.value, 10));
   }
 
   render() {
     const { currentPage, maxPages } = this.props;
 
     return (
       <div className="select">
        <select
          onChange={this.setPage}
          value={currentPage}
          style={this.props.style}
          className={this.props.className}
        >
          {getRange(maxPages)
            .map(num => (
              <option key={num} value={num}>{num}</option>
          ))}
        </select>
       </div>
     );
   }
 }

export default ({data}) => (
  <Griddle
    data={data}
    pageProperties={{
      pageSize: 5
    }}
    plugins={[plugins.LocalPlugin]}
    components={{
      Row: CustomRowComponent,
      TableContainer: CustomTableComponent,
      TableBody: CustomTableBody,
      SettingsToggle: (props) => null,
      Layout,
      PageDropdown,
    }}
    styleConfig={{
      classNames: {
        NextButton: 'button',
        PreviousButton: 'button',
        Filter: 'input'
      }
    }}
  /> 
)