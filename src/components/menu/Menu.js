import React from 'react';
import styled from 'styled-components';
import { Foods } from '../../data/data';
import { Food, FoodGrid } from './FoodGrid';

const MenuStyled = styled.div`
  height: 1000px;
  width: 50%;
  margin: 0px 20px 50px 20px;
  z-index: 3;
`;

const FoodTitle = styled.h3`
  margin: 15px 0 0 0;
  background-color: #59ff87ad;
  text-align: right;
`;

const Menu = () => {
  /* console.log(Object.keys(Foods)); */
  return (
    <MenuStyled>
      {Object.keys(Foods).map((key) => {
        return (
          <>
            <FoodTitle>{key}</FoodTitle>
            <FoodGrid>
              {Foods[key].map((food) => (
                <Food img={food.img}>{food.name}</Food>
              ))}
            </FoodGrid>
          </>
        );
      })}
    </MenuStyled>
  );
};

export default Menu;
