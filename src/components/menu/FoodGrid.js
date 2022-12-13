import styled from 'styled-components';
import { Title } from '../../styles/title';
import { below } from '../../styles/utilities';

export const FoodLabel = styled(Title)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  font-size: 15px;
`;

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  ${below.medium`
    grid-template-columns: 1fr 1fr;
  `}
  ${below.small`
    grid-template-columns: 1fr;
  `}
`;

export const Food = styled.div`
  height: 100px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  filter: contrast(60%);
  padding: 10px;
  font-size: 25px;
  transition-property: box-shadow, margin-top;
  transition-duration: 0.1s;
  box-shadow: 0 0 2px 0 gray;
  color: #000;
  border-radius: 0 0 7px 7px;
  &:hover {
    filter: grayscale(0.7);
    box-shadow: 0 0 15px 0 gray;

    transform: scale(1.02);
    cursor: pointer;
  }
  ${below.small`
    height: 200px;
  `}
`; // img es una propriedad de props, pasado al componente Food. Ej.: <Food img='string' />
