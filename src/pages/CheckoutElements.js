import styled from 'styled-components';

export const CheckoutContainerStyled = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-height: calc(100vh - 75px);
  position: absolute;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media screen and (max-width: 600px) {
    align-items: flex-start;
  }

  @media (orientation: landscape) {
    align-items: flex-start;
  }

  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fe8c00; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    mix-blend-mode: color;
  }

  &::after {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000000bd;
  }
`;

export const CheckoutGridContainer = styled.div`
  z-index: 15;
  margin-top: 43px;
`;

export const CheckoutIllustration = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const CheckoutImage = styled.img`
  max-width: 500px;
  width: 100%;
`;
