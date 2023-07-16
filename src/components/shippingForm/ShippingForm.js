import React, { useMemo, useState } from 'react';
import { Input, FormStyled, FormContent } from '../UI';
import useForm from '../../hooks/useForm'; // Hooks se exporta comumente como default
import { VALIDATOR_REQUIRE } from '../../utils';
import { CardSummary } from '../cardSummary/CardSummary';
import { Spinner } from '../UI/Spinner';
import { COSTO_DE_ENVIO } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as cartActions from '../../redux/cart/cartActions';
import axios from 'axios';

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
  const { data, isLoading, mutate } = useMutation({
    mutationKey: 'orders',
    mutationFn: async (vars) => {
      const customAxios = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/orders/`,
        headers: {
          Authorization: 'Bearer ' + vars.token,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      /*   */

      return customAxios.request('/', { data: vars });
    },
  });

  const [preferenceId, setpreferenceId] = useState(null);

  const navigate = useNavigate();
  // MANTENER POR REDUX: ESTADO DEL CLIENTE:
  const cartItems = useSelector((store) => store.cart.cartItems);

  // ESTADO DEL SERVIDOR: USAR REACT-QUERY!
  const currentUserData = useAuth();
  const currentUser = currentUserData?.data?.result;
  const dispatch = useDispatch();
  /* const currentUser = useSelector((store) => store.user.currentUser); */

  // CAMBIAR NOMBRE DE PROPRIEDAD DEL STATUS DEL ORDER, Y EL LOADING PODES USAR LO DEL REACT-QUERY:
  /* const { purchased, loading } = useSelector((store) => store.orders); */

  const subTotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0),
    []
  );

  const submitHandle = (e) => {
    e.preventDefault();

    if (cartItems.length < 1) return;

    if (!formState.isValid) {
      console.log('Completar todos los datos');
      return;
    }

    const token = JSON.parse(localStorage.getItem('authData')).token;

    // Transformar los items props de acuerdo con la api

    const orderData = {
      token,
      userId: currentUser.userId,
      shippingDetails: {
        domicilio: formState.inputs.domicilio.value,
        localidad: formState.inputs.localidad.value,
      },
      items: cartItems.map((item) => ({
        description: item.description,
        title: item.name,
        productId: item.id,
        unityPrice: item.price,
        quantity: item.quantity,
        picture_url: item.imgUrl,
      })),
      shippingPrice: COSTO_DE_ENVIO,
      subtotal: subTotal,
      total: subTotal + COSTO_DE_ENVIO,
    };

    if (!currentUser) {
      navigate('/login');
    }

    mutate(orderData, {
      onError: (error) => console.log(error),
      onSuccess: (data) => {
        setpreferenceId(data.data.data.result.preferenceId);
        dispatch(cartActions.clearCart());
      },
    });
    // USAR REACT-QUERY MUTATION PARA HACER EL POST A LA API DEL BACKEND:

    // ESTO SE MANTIENE PORQUE ES ESTADO DEL CLIENTE
  };

  /* if (purchased) { */
  /********
   * ESTO NO VA MAS, LA RESPUESTA DE LA MUTATION, SI ES SUCCESS, RETORNARÁ EL OBJECTO CON EL ORDER_ID,
   * Y EL INITPOINT, O SEA, SE INYECTA EL INIT_POINT AL BOTON DE PAGAR!!
   ******** */
  /*   dispatch(orderActions.purchaseInit());
    navigate('/mis-ordenes');
  } */
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
        preferenceId={preferenceId}
        isLoadingGeneratePreference={isLoading}
      />

      {isLoading && <Spinner />}
    </form>
  );
};
