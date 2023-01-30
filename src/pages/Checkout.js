import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* import { LayoutPage, Wrapper } from '../components/UI'; */
import { ShippingForm } from '../components/shippingForm/ShippingForm';
/* import styled from 'styled-components'; */
import {
  CheckoutContainerStyled,
  /* CheckoutIllustration,
  CheckoutImage,*/
  CheckoutGridContainer,
} from './CheckoutElements';

import CheckoutBackground from '../assets/checkout.jpg';
/* import CheckoutIllustrationSource from '../assets/checkoutIllustration.png'; */

const Checkout = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      /* console.log(currentUser); */
      navigate('/login');
    }
  });

  return (
    <CheckoutContainerStyled img={CheckoutBackground}>
      <CheckoutGridContainer>
        <ShippingForm />
      </CheckoutGridContainer>
    </CheckoutContainerStyled>
  );
};

export default Checkout;
