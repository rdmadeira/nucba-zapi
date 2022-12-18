import React from 'react';
import { LayoutPage, Wrapper } from '../components/UI';
import { ShippingForm } from '../components/shippingForm/ShippingForm';
/* import styled from 'styled-components'; */

/* const StyledCheckout = styled.div`
  max-width: 1440px;
  min-height: 900px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  max-width: 1440px;
  padding-top: 150px;
`; */

const Checkout = () => {
  return (
    <LayoutPage>
      <Wrapper>
        <ShippingForm></ShippingForm>
        <div style={{ backgroundColor: 'red' }}>dos</div>
      </Wrapper>
    </LayoutPage>
  );
};

export default Checkout;
