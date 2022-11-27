import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import * as cartActions from '../../redux/cart/cartActions';
import { ReactComponent as ShoppingIcon } from '../../assets/cart-icon.svg';

const StyledCartIcon = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: 2px red solid;
  background-color: #ffffff59;
`;

const ItemCount = styled.span`
  position: absolute;
  bottom: 12px;
  font-size: 10px;
  font-weight: bold;
  z-index: 5;
`;

const Carticon = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) =>
    state.cart.cartItems.reduce(
      (accumulador, cartItem) => accumulador + cartItem.quantity,
      0
    )
  );

  const handlerToggle = () => dispatch(cartActions.toogleCartHidden());

  return (
    <StyledCartIcon onClick={handlerToggle}>
      <ShoppingIcon style={{ width: '24px', height: '24px' }}></ShoppingIcon>
      <ItemCount>{quantity}</ItemCount>
    </StyledCartIcon>
  );
};

export default Carticon;
