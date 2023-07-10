import React from 'react';
/* import { useSelector } from 'react-redux'; */
import { useParams } from 'react-router-dom';
import useOrderItems from '../../hooks/useOrderItems';
import useOrders from '../../hooks/useOrders';
import useProducts from '../../hooks/useProducts';
import { CustomButton } from '../UI';

import {
  HeaderResume,
  ProductResume,
  ProductUl,
  ProductLi,
  ItemImg,
  InfoProducts,
  PriceResume,
  Quantity,
  CostResume,
  CostLi,
  OrderHistory,
  Container,
  TitleContainerStyled,
  VolverButtonStyled,
  StatusContainerStyled,
  Status,
} from './OrderResumeElements';

export const OrderResume = () => {
  let { orderId } = useParams(); // captura el orderId especificado en la ruta del elemento Resume, en App.js
  /* let { orders } = useSelector((state) => state.orders); */
  let order = useOrders(orderId);
  let orderItems = useOrderItems(orderId);
  console.log(orderItems);

  const completeOrder = {
    ...order?.data?.result,
    OrderItems: orderItems?.data?.result,
  };

  console.log(completeOrder); //yes!!

  return (
    <Container>
      <OrderHistory>
        <HeaderResume>
          <VolverButtonStyled to="/mis-ordenes">
            <CustomButton w="70px">Volver</CustomButton>
          </VolverButtonStyled>
          <TitleContainerStyled>
            <h3>Resumen</h3>
            <p>Pedido: {orderId}</p>
          </TitleContainerStyled>
          <StatusContainerStyled>
            <Status type={completeOrder?.status?.state}>
              {/* Hacer el request por el statusId */}
              {
                completeOrder?.status
                  ?.state /* Hacer el request por el statusId */
              }
            </Status>
          </StatusContainerStyled>
        </HeaderResume>
        <ProductResume>
          <h3>Productos</h3>
          <ProductUl>
            {completeOrder?.OrderItems?.map((item) => (
              <ProductLi>
                <ItemImg img={item.product.imgUrl} />
                <InfoProducts>
                  <p>
                    {item.product.name} - {item.product.description}
                  </p>
                </InfoProducts>

                <PriceResume>
                  <Quantity>{item.quantity} x</Quantity>
                  <strong>${item.unityPrice}</strong>
                </PriceResume>
              </ProductLi>
            ))}
          </ProductUl>
        </ProductResume>
        <CostResume>
          <h3>Costos</h3>
          <ProductUl>
            <CostLi>
              <span>Costo de los productos </span>

              <span>${completeOrder?.subTotal}</span>
            </CostLi>
            <CostLi>
              <span>Costo de envío </span>

              <span>${completeOrder?.ShippingPrice}</span>
            </CostLi>
            <CostLi>
              <span>
                <strong>Total</strong>
              </span>

              <span>
                <strong>${completeOrder?.total}</strong>
              </span>
            </CostLi>
          </ProductUl>
        </CostResume>
      </OrderHistory>
    </Container>
  );
};
