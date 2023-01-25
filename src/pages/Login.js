import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { auth, signInWithGoogle } from '../firebase/firebase-utils';

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
  const currentUser = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();

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

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <LayoutPage>
      <Wrapper>
        <form onSubmit={submitHandle}>
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
              <GoogleButton onClick={signInWithGoogle}>
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
