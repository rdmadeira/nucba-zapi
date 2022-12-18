import React from 'react';
import styled from 'styled-components';
import { formatPriceARS } from '../../utils/formatPrices';
import {
  Confirmbutton,
  DialogFooter,
  DialogContent,
  DialogShadow,
} from '../foodDialog/FoodDialog';
import { QuantityManage } from './QuantityManage';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../redux/cart/cartActions';
import { Link } from 'react-router-dom';

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  width: 340px;
  top: 93px;
  background-color: white;
  height: calc(100% - 93px);
  z-index: 10;
  box-shadow: 4px 0 5px 4px grey;
  display: flex;
  flex-direction: column;
  transform: ${({ show }) => (show ? `translateX(100%)` : `translateX(0)`)};
  /* transform: translateX(100%); */
  transition: 0.3s transform ease-in;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
  max-height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 5px;
  border-bottom: 1px solid #f7f7f7;
`;

const OrderItem = styled.div`
  padding: 10px 5px;
  display: grid;
  grid-template-columns: 50px 100px 100px;
  justify-content: space-between;
`;

const ItemImg = styled.div`
  width: 46px;
  height: 46px;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
`;

export const Order = () => {
  const hidden = useSelector((state) => state.cart.hidden);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handlerToggle = () => dispatch(cartActions.toogleCartHidden());

  return (
    <>
      {hidden && <DialogShadow onClick={handlerToggle} />}
      <OrderStyled show={!hidden}>
        {cartItems?.length === 0 ? (
          <OrderContent>No hay pedidos!!</OrderContent>
        ) : (
          <OrderContent>
            <OrderContainer>Tu pedido:</OrderContainer>

            {cartItems.map((cartItem) => (
              <OrderContainer>
                <OrderItem>
                  <ItemImg img={cartItem.img} />
                  <div>
                    <div>{cartItem.name}</div>
                    {formatPriceARS(cartItem.price * cartItem.quantity)}
                  </div>
                  <div>
                    <QuantityManage item={cartItem}></QuantityManage>
                  </div>
                </OrderItem>
              </OrderContainer>
            ))}
          </OrderContent>
        )}
        <DialogFooter>
          <Link to="/checkout" onClick={handlerToggle}>
            <Confirmbutton>Ir a Pagar {formatPriceARS(total)}</Confirmbutton>
          </Link>
        </DialogFooter>
      </OrderStyled>
    </>
  );
};
