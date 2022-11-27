import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { Navbar } from './components/navbar/Navbar';
import { Banner } from './components/banner/Banner';
import Menu from './components/menu/Menu';
import FoodDialog from './components/foodDialog/FoodDialog';
import { useOpenFood } from './hooks/useOpenFood';

import { Order } from './components/orders/Order';

function App() {
  const openedFood = useOpenFood();

  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openedFood}></FoodDialog>
      <Navbar />
      <Order></Order>
      <Banner>
        <h2>Las mejores comidas que deseas en su región</h2>
        <p>Pedi con apenas 1 click!</p>
      </Banner>
      <Menu {...openedFood} />
    </>
  );
}

export default App;
