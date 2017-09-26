import styled from 'styled-components';
import settings from './settings';

export const ToggleButton = styled.button`
margin-left:30px;
margin-top: 5px;
`;

export const Header = styled.header`
height: 80px;
background-color: hsl(171, 100%, 41%);
color: white;
padding: 20px 15px 0;
width: 100%;
position: absolute;
top: 0;
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
`

export const FooterLeft = styled.div`
width: 50%;
padding-left: 15px;

@media(max-width: ${settings.mobileWidth}px) {
  width: 100%;
}
`

export const FooterRight = styled.div`
width: 50%;
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

  small {
    position: initial;
  }
}

`

