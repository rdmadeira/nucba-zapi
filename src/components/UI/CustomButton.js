import styled, { css } from 'styled-components';
import { nucbazapiRed } from '../../styles/utilities';

export const CustomButton = styled.button`
  font-family: 'Montserrat', cursive;
  font-weight: 700;
  z-index: 999;
  margin: ${({ m }) => (m ? `${m}` : '10px')};
  color: white;
  border-radius: 8px;
  width: ${({ w }) => (w ? `${w}` : '200px')};
  cursor: pointer;
  background-color: ${nucbazapiRed};
  text-align: center;
  padding: 10px;
  ${({ disabled }) =>
    disabled &&
    css`
      background: #ccc !important;
      color: #fff;
      border: 1px rgb(184, 182, 182) solid;
      cursor: not-allowed !important;
      transition: 0.5s ease-out;
    `}

  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
`;
