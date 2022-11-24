import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

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
`;

const Carticon = () => {
  const dispatch = useDispatch();
  return (
    <StyledCartIcon>
      <ShoppingIcon style={{ width: '24px', height: '24px' }}>
        <ItemCount>{0}</ItemCount>
      </ShoppingIcon>
    </StyledCartIcon>
  );
};

export default Carticon;
