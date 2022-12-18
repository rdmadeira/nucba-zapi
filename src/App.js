import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { Navbar } from './components/navbar/Navbar';
import { useOpenFood } from './hooks/useOpenFood';
import { Order } from './components/orders/Order';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

function App() {
  const openedFood = useOpenFood();

  return (
    <>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Order />
        <Routes>
          <Route exact path="/" element={<Home openedFood={openedFood} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
