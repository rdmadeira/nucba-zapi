import React from 'react';
import { Input, FormStyled, FormContent } from '../UI';
import useForm from '../../hooks/useForm'; // Hooks se exporta comumente como default
import { VALIDATOR_REQUIRE } from '../../utils';
import { CardSummary } from '../cardSummary/CardSummary';
import { Spinner } from '../UI/Spinner';
import { COSTO_DE_ENVIO } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as orderActions from '../../redux/orders/ordersActions';
import * as cartActions from '../../redux/cart/cartActions';

export const ShippingForm = () => {
  const [formState, inputHandle] = useForm(
    {
      domicilio: {
        value: '',
        isValid: false,
      },
      localidad: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // MANTENER POR REDUX: ESTADO DEL CLIENTE:
  const cartItems = useSelector((store) => store.cart.cartItems);

  // ESTADO DEL SERVIDOR: USAR REACT-QUERY!
  const currentUser = useSelector((store) => store.user.currentUser);

  // CAMBIAR NOMBRE DE PROPRIEDAD DEL STATUS DEL ORDER, Y EL LOADING PODES USAR LO DEL REACT-QUERY:
  const { purchased, loading } = useSelector((store) => store.orders);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const submitHandle = (e) => {
    e.preventDefault();
    if (!formState.isValid) {
      console.log('Completar todos los datos');
      return;
    }
    const orderData = {
      userId: currentUser.id,
      shippingDetails: {
        domicilio: formState.inputs.domicilio.value,
        localidad: formState.inputs.localidad.value,
      },
      items: [...cartItems],
      shippingPrice: COSTO_DE_ENVIO,
      subtotal: subTotal,
      total: subTotal + COSTO_DE_ENVIO,
    };
    // USAR REACT-QUERY MUTATION PARA HACER EL POST A LA API DEL BACKEND:
    dispatch(orderActions.createOrder(orderData)); // Estado del servidor

    // ESTO SE MANTIENE PORQUE ES ESTADO DEL CLIENTE
    dispatch(cartActions.clearCart()); // Estado del cliente
  };

  if (purchased) {
    /********
     * ESTO NO VA MAS, LA RESPUESTA DE LA MUTATION, SI ES SUCCESS, RETORNARÁ EL OBJECTO CON EL ORDER_ID,
     * Y EL INITPOINT, O SEA, SE INYECTA EL INIT_POINT AL BOTON DE PAGAR!!
     ******** */
    dispatch(orderActions.purchaseInit());
    navigate('/mis-ordenes');
  }
  return (
    <form onSubmit={submitHandle}>
      <FormStyled>
        <FormContent>
          <Input
            id="domicilio"
            type="text"
            label="Domicilio"
            onInput={inputHandle}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Campo Obligatório"
          />
          <Input
            id="localidad"
            type="text"
            label="Localidad"
            onInput={inputHandle}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Campo Obligatório"
          />
        </FormContent>
      </FormStyled>
      <CardSummary
        formIsValid={formState.isValid}
        subTotal={subTotal}
        envio={COSTO_DE_ENVIO}
      />
      {loading && <Spinner />}
    </form>
  );
};
