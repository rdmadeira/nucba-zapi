import React from 'react';
import { Banner } from '../components/banner/Banner';
import Menu from '../components/menu/Menu';
import FoodDialog from '../components/foodDialog/FoodDialog';

const Home = ({ openedFood }) => {
  return (
    <>
      <FoodDialog {...openedFood}></FoodDialog>
      <Banner>
        <h2>Las mejores comidas que deseas en su región</h2>
        <p>Pedi con apenas 1 click!</p>
      </Banner>
      <Menu {...openedFood} />
    </>
  );
};

export default Home;
