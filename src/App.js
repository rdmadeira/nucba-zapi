import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { Navbar } from './components/navbar/Navbar';
import { Banner } from './components/banner/Banner';
import Menu from './components/menu/Menu';
import FoodDialog from './foodDialog/FoodDialog';
import { useOpenFood } from './hooks/useOpenFood';

function App() {
  const openedFood = useOpenFood();

  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openedFood}></FoodDialog>
      <Navbar />
      <Banner>
        <h2>Las mejores comidas que deseas en su región</h2>
        <p>Pedi con apenas 1 click!</p>
      </Banner>
      <Menu {...openedFood} />
    </>
  );
}

export default App;
