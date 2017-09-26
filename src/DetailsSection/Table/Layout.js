import React from 'react';

import {
  GriddleWrapper,
  ContentWrapper,
  MapWrapper,
  TableWrapper,
} from './styles';

import Map from './Map';

const Layout = ({ Table, Pagination, Filter }) => (
  <GriddleWrapper>
    <Filter />
    <ContentWrapper>
      <MapWrapper>
        <Map />
      </MapWrapper>
      <TableWrapper>
        <Table />
      </TableWrapper>
    </ContentWrapper>
  </GriddleWrapper>
);

export default Layout;