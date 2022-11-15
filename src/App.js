import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { Navbar } from './components/navbar/Navbar';
import { Banner } from './components/banner/Banner';
import Menu from './components/menu/Menu';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Banner>
        <h2>Las mejores comidas que deseas en su región</h2>
        <p>Pedi con apenas 1 click!</p>
      </Banner>
      <Menu />
    </>
  );
}

export default App;
