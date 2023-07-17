import React, { useEffect } from 'react';
/* import { useSelector } from 'react-redux'; */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
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
  // PARA HACER: NO USAR USESELECTOR DE REDUX, Y SÍ REACT-QUERY, POR MEDIO DEL HOOK DEL CONTEXT AUTH:
  const currentUser = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.data) {
      navigate('/login');
    }
  });

  return (
    <CheckoutContainerStyled img={CheckoutBackground}>
      <CheckoutGridContainer>
        <ShippingForm currentUser={currentUser} />
      </CheckoutGridContainer>
    </CheckoutContainerStyled>
  );
};

export default Checkout;
