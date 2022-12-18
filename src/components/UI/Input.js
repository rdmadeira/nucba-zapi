import React, { useReducer, useEffect } from 'react';
import { validate } from '../../utils';
import styled, { css } from 'styled-components';

const FormControl = styled.div`
  margin: 1rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  position: relative;
  background-color: #f4f4f4;
  border-radius: 15px;
  font-size: 16px;
  color: #7d7d7d;
  padding: 4px 0;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
  &:focus {
    background-color: #ffffff;
    outline-width: 0;
  }

  ${({ showError }) =>
    showError
      ? css`
          border-color: red;
          background: #ffd1d1;
        `
      : null}
`;

// Tecnica comun al 2021 de hacer transparente el input y aplicar estilos al input-container
const StyledInput = styled.input`
  width: 100%;
  font: inherit;
  border: none;
  caret-color: #ff441f;
  padding: 1rem;
  border-radius: 15px;
  background-color: transparent;
  height: 25px;
  padding: 0.15rem 0.35rem;
  display: block;
  color: #7d7d7d;
  &:focus {
    outline: #989898 2px solid;
    background-color: transparent;
  }
`;

const StyledLabel = styled.label`
  font-weight: bold;
  padding: 4px 0;
  margin-bottom: 0.5rem;
  ${({ showError }) =>
    showError
      ? css`
          color: red;
        `
      : null}
`;

const ErrorText = styled.p`
  color: red;
  padding: 4px 0;
  margin: 0 16px;
`;

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCHE':
      return {
        ...state,
        isTouche: true,
      };
    default:
      return state;
  }
};

export const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouche: false,
  });

  const { isValid, value } = inputState;
  const { onInput, id } = props;

  useEffect(() => {
    onInput(id, value, isValid);
    //console.log(id, value, isValid);
  }, [isValid, value, onInput, id]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const toucheHandler = () => {
    dispatch({
      type: 'TOUCHE',
    });
  };

  return (
    <FormControl>
      <StyledLabel
        htmlFor={props.id}
        showError={!inputState.isValid && inputState.isTouche}
      >
        {props.label}
      </StyledLabel>
      <InputContainer showError={!inputState.isValid && inputState.isTouche}>
        <StyledInput
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={toucheHandler}
          value={inputState.value}
          showError={!inputState.isValid && inputState.isTouche}
        />
      </InputContainer>
      {!inputState.isValid && inputState.isTouche && (
        <ErrorText>{props.errorText}</ErrorText>
      )}
    </FormControl>
  );
};

export default Input;
