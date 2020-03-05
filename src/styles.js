import styled from 'styled-components';
import settings from './settings';
import { statusColors } from './utils/colors';

export const ToggleButton = styled.button`
  margin: 5px 0 0 -1px;

  &.cancelled:focus {
    border-color: ${statusColors.cancelled};
  }
  &.postponed:focus {
    border-color: ${statusColors.postponed};
  }

  &.happening:focus {
    border-color: ${statusColors.happening};
  }

  &.noInfo:focus {
    border-color: ${statusColors.noInfo};
  }

  &.addEvent { 
    width: 400px;
  }
  }
`;

// This margin-left bit is not.. great. 🙃
export const DateFilterWrapper = styled.div`
position: relative;
display: flex;
flexDirection: column;
alignItems: center;

  @media(max-width: ${settings.mobileWidth}px) {
    display: none;
  }

`

export const SecondaryButtonGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 20px;

  @media(max-width: ${settings.mobileWidth}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Header = styled.header`
height: 120px;
background-color: hsl(171, 100%, 41%);
color: white;
padding: 20px 15px 0;
width: 100%;
display: flex;
justify-content: space-between;


h1 {
  font-family: 'Exo', sans-serif;
  font-size: 26px;
}

div {
  max-width: 400px;
}

a, a:visited, a:hover {
  color: hsl(171, 80%, 73%);
}

@media(max-width: 760px) {
  text-align: center;

  div {
    display: none;
  }
}
`;

export const Footer = styled.footer`
border-top: 2px solid #AAA;
position: fixed;
height: 100px;
padding: 10px 15px 0 0;
bottom: 0;
background-color: #EDEDED;
width: 100%;
display: flex;
flex-wrap: wrap;

@media(max-width: ${settings.mobileWidth}px) {
  height: 150px;
}
`

export const FooterLeft = styled.div`
width: 33%;
padding-left: 15px;

@media(max-width: ${settings.mobileWidth}px) {
  width: 50%;

  font-size: 11px;
}
`

export const FooterMiddle = styled.div`
width: 33%;
padding-left: 15px;

@media(max-width: ${settings.mobileWidth}px) {
  width: 50%;
}
`

export const AdWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
align-items: top;

a:link, a:visited, a:hover, a:active {
  display: block;
  color: #333;
  margin-right: 10px;
}

@media(max-width: ${settings.mobileWidth}px) {
    flex-direction: row;
  
  small {
    font-size: 9px;
  }
}
`

export const FooterRight = styled.div`
width: 33%;
bottom: 0;
color: #AAA;
position: relative;

small { 
  width: 600px;
  max-width: 100%;
  position: absolute;
  bottom: 40px;
  right: 20px;
}

a, a:visited, a:hover {
  color: #555;
}

@media(max-width: ${settings.mobileWidth}px) {
  width: 100%;

  font-size: 11px;

  small {
    position: initial;
  }
}
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  @media(max-width: ${settings.mobileWidth}px) {
    flex-direction: column;
  }
`
export const Column = styled.div`
  width: 50%;

  &.right {
    align-items: right;
  }

  @media(max-width: ${settings.mobileWidth}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

`
export const ButtonGroupWrapper = styled.div`
  justify-content: center !important; /* :( */
  width: 100%;
  align-items: center !important;

  @media(max-width: ${settings.mobileWidth}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .button {
      width: 400px;
    }
  }


`;

export const DropdownWrapper = styled.span`
  padding: 0px;

  &.is-primary {
    select {
      color: #FFF;
    }

    ::after {
      border-color: #FFF;
    }

  }
  select {
    text-transform: capitalize;

    max-height: 35px;
    background: none;
  }
`

export const IconWrapper = styled.span`
  display: inline-block;
  margin: 0 5px 0 0 !important;

  i {
    font-size: 14px !important;
    margin-top: 2px;
  }
`

export const IconWrapperLarge = styled.span`
  display: inline-block;
  margin: 0 5px 0 5px !important;


  i {
    font-size: 16px !important;
    margin-top: 3px;
    opacity: .5
  }
`

export const FavoriteButton = styled.button`
  width: 90px;
  max-width: 90px;
`

export const SmallParagraph = styled.small`
  display: block;
  margin-top: 20px;
  line-height: 1.25em;
  opacity: 0.65;
`

export const InlineLabel = styled.label`
  span {
    margin: 8px 5px 0 0;
    display: inline-block;
  }

  input {
    width: 450px;
  }

  button {
    position: relative;
    left: -4px;
  }
`;

/* TODO: clean all these styles up */
export const ShareWrapper = styled.div`
  width: 100%;

  >div {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  >div:nth-child(1) {
    padding-top: 15px;
    border-top: 3px solid #EDEDED;
  }
`

export const CopyIconWrapper = styled(IconWrapper)`
  i {
    margin-top: 5px;
  }
`

export const SharedHeadingWrapper = styled.div`
  margin-top: 100px;
  padding-left: 15px;

  h2 {
    font-size: 28px;
    font-weight: bold;

    span {
      opacity: .5;
    }
  }
`