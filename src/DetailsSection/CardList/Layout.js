import React from 'react';
import {
  GriddleWrapper,
  Left,
  Right,
  TopWrapper,
  CenteredPagination
} from './styles';

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

export default Layout;