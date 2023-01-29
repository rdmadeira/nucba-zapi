import React from 'react';
import { Input, FormStyled, FormContent } from '../UI';
import useForm from '../../hooks/useForm'; // Hooks se exporta comumente como default
import { VALIDATOR_REQUIRE } from '../../utils';
import { CardSummary } from '../cardSummary/CardSummary';
import { COSTO_DE_ENVIO } from '../../utils/constants';
import { useSelector } from 'react-redux';

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
  const cartItems = useSelector((store) => store.cart.cartItems);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const submitHandle = (e) => {
    e.preventDefault();
    if (!formState.isValid) {
      console.log('Completar todos los datos');
      return;
    }
    console.log('Todo Ok');
  };
  /*   console.log(formState);
   */ return (
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
    </form>
  );
};
