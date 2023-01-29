import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LayoutPage, Wrapper } from '../components/UI';
import { ShippingForm } from '../components/shippingForm/ShippingForm';
/* import styled from 'styled-components'; */

const Checkout = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      console.log(currentUser);
      navigate('/login');
      console.log('object');
    }
  });

  return (
    <LayoutPage>
      <Wrapper>
        <ShippingForm></ShippingForm>
      </Wrapper>
    </LayoutPage>
  );
};

export default Checkout;
