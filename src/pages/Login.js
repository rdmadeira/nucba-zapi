import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

/* import { useSelector } from 'react-redux'; */
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
import { signInWithGoogle } from '../firebase/firebase-utils';
import { nucbazapiRed } from '../styles/utilities';

import axios from 'axios';

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
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

const Alink = styled.a`
  color: ${nucbazapiRed};
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SpanErrorStyled = styled.span`
  color: red;
  display: flex;
  justify-content: center;
`;

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  /* const [signInError, setSignInError] = useState(undefined); */
  const currentUser = useAuth();
  /* const currentUser = useSelector((store) => store.user.currentUser); */
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError, mutate, error, reset } =
    useMutation({
      mutationFn: async (vars) => {
        const myPostAxios = axios.create({
          baseURL: 'http://localhost:8000/api/v1/auth/',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        // interceptor:
        myPostAxios.interceptors.response.use(
          (response) => response.data.result
        );

        return vars.signUp
          ? myPostAxios.request('signup', { data: vars })
          : myPostAxios.request('login', { data: vars }); // Faltaba el error, por eso no entraba en onError de useMutation!!
      },
    });

  useEffect(() => {
    if (currentUser.data) {
      console.log(currentUser.data);
      navigate(-1);
    }
  }, [currentUser, navigate]);

  const [formState, inputHandle, setFormData] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  });

  useEffect(() => {
    reset();
  }, [formState.inputs, reset]);

  const submitSignUpHandle = async (event) => {
    event.preventDefault();
    mutate(
      {
        name: formState.inputs.displayName.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        signUp: true,
      },
      {
        onError: (error) => console.log('error', error),
        onSuccess: (data) => {
          const authDataString = JSON.stringify({
            id: data.userId,
            token: data.token,
          });
          localStorage.setItem('authData', authDataString);
          alert(`${data.name}, succesfully registered account!`);
        },
      }
    );
    /* event.preventDefault();
    if (isLoginMode) {
      try {
        await auth.signInWithEmailAndPassword(
          formState.inputs.email.value,
          formState.inputs.password.value
        );
      } catch (error) {
        console.log(error);
        setSignInError('w-p');
      }
    } else {
      try {
       
          const { user } = await auth.createUserWithEmailAndPassword(
          formState.inputs.email.value,
          formState.inputs.password.value
        );
        await createUserProfileDocument(user, {
          displayName: formState.inputs.displayName.value,
        });
      } 
      } catch (error) {
         console.log(error);
        setSignInError('mail-in-use'); 
      } */
  };

  const submitLoginHandle = async (e) => {
    e.preventDefault();
    mutate(
      {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        signUp: false,
      },
      {
        onSuccess: (data, vars) => {
          const authDataString = JSON.stringify({
            id: data.userId,
            token: data.token,
          });
          localStorage.setItem('authData', authDataString);
          console.log(authDataString);

          navigate(0);
        },
        onError: (error) => console.log('error', error),
      }
    );
  };

  const switchLoginModeHandle = () => {
    if (!isLoginMode) {
      setFormData(
        {
          email: { value: '', isValid: false },
          password: {
            value: '',
            isValid: false,
          },
        },
        formState.inputs.email?.isValid && formState.inputs.password?.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          displayName: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((previous) => !previous);
  };

  const signInWithGoogleHandle = () => {
    reset();
    signInWithGoogle();
  };
  return (
    <LayoutPage>
      <Wrapper>
        <form onSubmit={!isLoginMode ? submitSignUpHandle : submitLoginHandle}>
          <FormStyled>
            <FormContent>
              {!isLoginMode && (
                <Input
                  id="displayName"
                  type="text"
                  label="Nombre"
                  onInput={inputHandle}
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Ingresá un Nombre"
                />
              )}
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
                errorText="Ingresá una contraseña de 8 o mas caracteres"
              />
            </FormContent>
            <SpanErrorStyled>
              {isError &&
                error.response?.data?.errors.map((error) => {
                  return error.message + '\n';
                })}
            </SpanErrorStyled>

            <ContainerButtons>
              <LoginSubmitButton disabled={!formState.isValid}>
                {isLoginMode ? 'Ingresar' : 'Registrar'}
              </LoginSubmitButton>
              <GoogleButton type="button" onClick={signInWithGoogleHandle}>
                <GoogleIcon src={GoogleLogo} />
                <p>Login con Google</p>
              </GoogleButton>
            </ContainerButtons>
            <ContainerButtons>
              <span>
                {isLoginMode
                  ? 'Todavía no estás Registrado? '
                  : 'Ya tenes una cuenta? '}
              </span>
              <Alink onClick={switchLoginModeHandle}>
                {!isLoginMode ? 'Ingresá' : 'Registrar'}
              </Alink>
            </ContainerButtons>
          </FormStyled>
        </form>
      </Wrapper>
    </LayoutPage>
  );
};

export default Login;
