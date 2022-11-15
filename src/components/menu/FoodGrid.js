import styled from 'styled-components';

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const Food = styled.div`
  height: 100px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  &:hover {
    filter: grayscale(.7);
    transition: 0.3s all ease;
    transform: scale(1.03);
    cursor: pointer;
  }
  }
`; // img es una propriedad de props, pasado al componente Food. Ej.: <Food img='string' />
