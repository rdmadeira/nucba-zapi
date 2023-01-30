import React from 'react';
import { OrderResume } from '../components/myOrders/OrderResume';

import { CheckoutContainerStyled } from './CheckoutElements';

import CheckoutBackground from '../assets/checkout.jpg';

const Resume = () => {
  return (
    <CheckoutContainerStyled img={CheckoutBackground}>
      <OrderResume />
    </CheckoutContainerStyled>
  );
};

export default Resume;
