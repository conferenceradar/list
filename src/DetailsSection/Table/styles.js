import styled from 'styled-components';
import settings from '../../settings';

export const GriddleWrapper = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
margin: 0 15px 15px 15px;
`

export const ContentWrapper = styled.div`
display: flex;
flex-wrap: wrap-reverse;
flex-direction: row;
width: 100%;
margin-bottom: 80px;
`

export const MapWrapper = styled.div`
min-height: 800px;
width: 50%;

@media (max-width: ${settings.mobileWidth}px) {
  width: 100%;
}
`

export const TableWrapper = styled.div`
width: 50%;

div {
  width: 100%;
}

table {
  width: 100%;
  min-width: 100%;
  border-spacing: 0;
  font-size: 18px;
  height: 800px;
  min-height: 800px;
}

th {
  text-align: left;
}

td {
  height: 90px;
  max-height: 90px;
  min-height: 90px;
  width: 25%;
}

td:first-child {
  padding-left: 15px;
}

@media (max-width: ${settings.mobileWidth}px) {
  width: 100%;
}
`

export const FilterInput = styled.input`
margin: 10px 0 10px 0;
`

export const LocationWrapper = styled.div`
small {
  font-size: 12px;
  display: block;
}
`;

export const DateColumnWrapper = styled.div`
small {
  display: block;
  font-size: 12px;
}
`;
