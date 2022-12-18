import { Input, FormStyled, FormContent } from '../UI';
import useForm from '../../hooks/useForm'; // Hooks se exporta comumente como default
import { VALIDATOR_REQUIRE } from '../../utils';
import { CardSummary } from '../cardSummary/CardSummary';

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
      <CardSummary formIsValid={formState.isValid} />
    </form>
  );
};
