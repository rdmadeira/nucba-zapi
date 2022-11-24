import React from 'react';
import styled from 'styled-components';
import { formatPriceARS } from '../../data/data';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';

import { useSelector } from 'react-redux';

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

const Menu = ({ setOpenFood }) => {
  const Foods = useSelector((store) => store.products.foods);
  return (
    <MenuStyled>
      {/* Con esta opcion Object.keys y key, tenemos que hacer doble map, porque Object.keys devuelve un array de las keys en string. Habria que iterar de nuevo usando maps para cada key. En cambio, 
      Object.entries devuelve un array, cuyos elementos son array conteniendo la key y el array de foods.
      Object.keys: [key1, key2, key3,...]
      Object.entries: [[key1, foods], [key2, food2], [key3, food3],...]
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
      })} */}
      {Object.entries(Foods).map(([key, foods]) => {
        return (
          <>
            <FoodTitle>{key}</FoodTitle>
            <FoodGrid>
              {foods.map((food) => (
                <Food img={food.img} onClick={() => setOpenFood(food)}>
                  <FoodLabel>
                    <div>{food.name}</div>
                    <div>{formatPriceARS(food.price)}</div>
                  </FoodLabel>
                </Food>
              ))}
            </FoodGrid>
          </>
        );
      })}
    </MenuStyled>
  );
};

export default Menu;
