import styled from 'styled-components';

export const statusColors = {
  cancelled: '#E83636',
  postponed: '#F9D95F',
  happening: '#7DF95F',
  noInfo: '#555',
  online: '#7E22E3'
}

export const MapBlip = styled.div`
  border-radius: 50px;
  background-color: ${({status}) => statusColors[status]};
  width: 25px;
  height: 25px;
  position: relative;
  top: -10px;
  left: -10px;
`;

export const MapInfo = styled.div`
  background-color: #EDEDED;
  border: 1px solid #777;
  width: 150px;
  height: 70px;
  padding: 10px;
  position: relative;
  z-index: 9999;
  top: -10px;
  left: -10px;
`;

