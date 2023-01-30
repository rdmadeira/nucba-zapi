import React from 'react';
import { Link } from 'react-router-dom'; // useRouteMatch deprecated
import { CustomButton } from '../UI';
import { formatDate, formatPriceARS } from '../../utils';

import {
  Container,
  OrderHistory,
  Wrapper,
  OrderTitle,
  OrderContent,
  OrderDetails,
  OrderUl,
  OrderLi,
  OrderSpan,
  Flex,
  Status,
  StatusContainerStyled,
} from './myOrdersElements';

export const MyOrders = ({ orders }) => {
  return (
    <Container>
      <OrderHistory>
        <Wrapper>
          <OrderTitle>
            <h2>Mis últimos pedidos! </h2>
            <p>
              Haz seguimiento al detalle de tus pedidos anteriores y solicita
              ayuda si hay algún inconveniente con una de tus compras.
            </p>
          </OrderTitle>

          <div>
            {orders.map((order) => (
              <OrderContent>
                <OrderDetails>
                  <OrderUl>
                    <OrderLi>
                      <OrderSpan>Fecha:</OrderSpan>
                      {formatDate(new Date(order.createdAt.seconds))}
                    </OrderLi>
                    <OrderLi>
                      <OrderSpan>Total:</OrderSpan>
                      {formatPriceARS(order.total)}
                    </OrderLi>
                  </OrderUl>
                  <StatusContainerStyled>
                    <Status type={order.status}>{order.status}</Status>
                  </StatusContainerStyled>
                  <Flex>
                    <Link to={`${order.id}`}>
                      <CustomButton w="150px" m="0">
                        Ver resumen
                      </CustomButton>
                    </Link>
                  </Flex>
                </OrderDetails>
              </OrderContent>
            ))}
          </div>
        </Wrapper>
      </OrderHistory>
    </Container>
  );
};
