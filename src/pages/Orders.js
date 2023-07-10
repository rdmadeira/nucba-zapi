import React /* , { useCallback, useEffect } */ from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector /* , useDispatch */ } from 'react-redux';

import { MyOrders } from '../components/myOrders/MyOrders';
/* import * as orderActions from '../redux/orders/ordersActions'; */

import { CheckoutContainerStyled } from './OrdersElements';

import CheckoutBackground from '../assets/checkout.jpg';
import useOrders from '../hooks/useOrders';

const Orders = () => {
  const orders = useOrders();

  /*   const currentUser = useSelector((state) => state.user.currentUser);
   */ /* let { orders } = useSelector((state) => state.orders); */
  /* const navigate = useNavigate(); */
  /*   const dispatch = useDispatch();
   */
  /* const fetchOrders = useCallback(async () => {
    await dispatch(orderActions.fetchOrders(currentUser?.id));
  }, [dispatch, currentUser]);
 */
  /* if (!currentUser) {
    navigate('/');
  }
 */
  /* useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); */

  return (
    <CheckoutContainerStyled img={CheckoutBackground}>
      <MyOrders orders={orders.data} />
    </CheckoutContainerStyled>
  );
};

export default Orders;
