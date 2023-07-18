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
  let sortedOrders = orders?.result.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
  });

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
            {sortedOrders?.length > 0 ? (
              sortedOrders?.map((order) => (
                <OrderContent key={order.id}>
                  <OrderDetails>
                    <OrderUl>
                      <OrderLi>
                        <OrderSpan>Fecha:</OrderSpan>
                        {formatDate(new Date(order.createdAt))}
                      </OrderLi>
                      <OrderLi>
                        <OrderSpan>Total:</OrderSpan>
                        {formatPriceARS(order.total)}
                      </OrderLi>
                    </OrderUl>
                    <StatusContainerStyled>
                      <Status type={order.status.state}>
                        {order.statusId === 1
                          ? 'pendiente pago'
                          : order.statusId === 5
                          ? 'aprobado'
                          : order.status.state}
                      </Status>
                    </StatusContainerStyled>

                    <Flex>
                      <Link to={`${order.id}`}>
                        <CustomButton w="150px" m="0">
                          {order.status.state === 'active'
                            ? 'Pagar'
                            : 'Ver resumen'}
                        </CustomButton>
                      </Link>
                    </Flex>
                  </OrderDetails>
                </OrderContent>
              ))
            ) : (
              <OrderDetails>No tenes Ordenes</OrderDetails>
            )}
            {}
          </div>
        </Wrapper>
      </OrderHistory>
    </Container>
  );
};
