import React from 'react';
import styled from 'styled-components';
import { formatPriceARS } from '../data/data';
import {
  Confirmbutton,
  DialogFooter,
  DialogContent,
} from '../foodDialog/FoodDialog';

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
  transform: translateX(100%);
  transition: 0.6s transform ease-in;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
  max-height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 5px;
  border-bottom: 1px solid grey;
`;

const OrderItem = styled.div`
  padding: 10px 5px;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;

export const Order = ({ orders }) => {
  return (
    <OrderStyled>
      {orders?.length === 0 ? (
        <OrderContent>No hay pedidos!!</OrderContent>
      ) : (
        <OrderContent>
          <OrderContainer>Tu pedido:</OrderContainer>

          {orders.map((order) => (
            <OrderContainer>
              <OrderItem>
                <div>1</div>
                <div>{order.name}</div>
                <div>{formatPriceARS(order.price)}</div>
              </OrderItem>
            </OrderContainer>
          ))}
        </OrderContent>
      )}
      <DialogFooter>
        <Confirmbutton>Ir a Pagar</Confirmbutton>
      </DialogFooter>
    </OrderStyled>
  );
};
