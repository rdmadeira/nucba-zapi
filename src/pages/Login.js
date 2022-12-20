import React from 'react';
import styled from 'styled-components';
import {
  Wrapper,
  Input,
  LayoutPage,
  FormStyled,
  FormContent,
  CustomButton,
} from '../components/UI';
import GoogleLogo from '../assets/google_icon.svg';
import useForm from '../hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../utils';

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LoginSubmitButton = styled(CustomButton)`
  border: none;
`;

const GoogleButton = styled(CustomButton)`
  display: flex;
  justify-content: space-evenly;
  background-image: linear-gradient(130deg, #ff9259 0%, #ff2426 70%);
  border: none;
`;
const GoogleIcon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const Login = () => {
  const [formState, inputHandle] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  });
  return (
    <LayoutPage>
      <Wrapper>
        <form>
          <FormStyled>
            <FormContent>
              <Input
                id="email"
                type="email"
                label="Email"
                onInput={inputHandle}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Ingresá un Email válido"
              />
              <Input
                id="password"
                type="password"
                label="Password"
                onInput={inputHandle}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
                errorText="Ingresá un Email válido"
              />
            </FormContent>
            <ContainerButtons>
              <LoginSubmitButton disabled={!formState.isValid}>
                Ingresar
              </LoginSubmitButton>
              <GoogleButton disabled={!formState.isValid}>
                <GoogleIcon src={GoogleLogo} />
                <p>Login con Google</p>
              </GoogleButton>
            </ContainerButtons>
          </FormStyled>
        </form>
      </Wrapper>
    </LayoutPage>
  );
};

export default Login;
