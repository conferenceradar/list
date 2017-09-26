import React from 'react';
import { ListWrapper } from './styles';
import NoResults from '../NoResults';

const CustomTableBody = ({ rowIds, Row, className }) => (
  <ListWrapper>
    { (!rowIds || rowIds.size === 0) && <NoResults /> }
    { rowIds && rowIds.map(r => <Row key={r} griddleKey={r} />) }
  </ListWrapper>
);

export default CustomTableBody;