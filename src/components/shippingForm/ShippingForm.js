import { Input, FormStyled, FormContent } from '../UI';
import useForm from '../../hooks/useForm'; // Hooks se exporta comumente como default
import { VALIDATOR_REQUIRE } from '../../utils';

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
  return (
    <form>
      <FormStyled>
        <FormContent>
          <Input
            id="domicilio"
            type="text"
            label="Domicilio"
            onInput={inputHandle}
            validators={[VALIDATOR_REQUIRE]}
            errorText="Campo Obligatório"
          />
          <Input
            id="localidad"
            type="text"
            label="Localidad"
            onInput={inputHandle}
            validators={[VALIDATOR_REQUIRE]}
            errorText="Campo Obligatório"
          />
        </FormContent>
      </FormStyled>
    </form>
  );
};
