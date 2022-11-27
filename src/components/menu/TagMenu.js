import styled from 'styled-components';
import { nucbazapiGray } from '../../styles/colors';

export const Tagsmenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow-x: scroll;
  margin: 20px 0;
  padding: 10px 0;
  @media screen and (max-width: 600px) {
    justify-content: flex-start;
  }
`;

export const Tagcard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ selected }) => (selected ? '#e8e8e8' : '#fff')};
  color: ${nucbazapiGray};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.09);
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    background: #e8e8e8;
    box-shadow: none;
  }
`;

export const Tagimg = styled.div`
  border-radius: 50%;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;
