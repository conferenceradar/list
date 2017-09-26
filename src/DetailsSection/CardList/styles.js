import styled from 'styled-components'

export const CardWrapper = styled.div`
  position: relative;
  margin: 0 10px 0 10px;

  h1 {
    font-weight: bold;
    font-size: 16px;
  }
`

export const ListWrapper = styled.div`
`

export const CenteredPagination = styled.div`
  width: 100%;
  text-align: center;
  margin: 25px 0 25px 0;
`

export const GriddleWrapper = styled.div`
  margin-bottom: 120px;

  .button {
    margin: 0 10px 0 10px;
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  margin: 10px;

  @media(max-width: 640px) {
    button {
      display: none;
    }
  }

`

export const Left = styled.div`
  width: 50%;
`
export const Right = styled.div`
  width: 50%;
  text-align: right;
  padding-right: 20px;
`

export const DateWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;

  color: #999;

  small {
    display: block;
    font-size: 12px;
  }
`;
