import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      // eslint-disable-next-line no-case-declarations
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          /* la expresion [action.inputId] está entre colchetes porque action.inputId es una variable */
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidation) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidation,
  });

  // En este caso, usamos useCallback para indicar a React qu esta función esla misma del render anterior,
  // no haciendo que se re-renderice y crie el loop infinito, con el useEffect del Input. Javascript entiende
  // que la función anterior al render del input es distinto a la nueva función recibida por useEffect, porque trata los
  // objetos como referenciales(ocupan lugares distintos de la memória). Los datos primitivos, son valores que se guardan en la memória, permitiendo hacerse comparaciones (===, !==, etc.)
  const inputHandle = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidation) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      isValid: formValidation,
    });
  }, []);

  return [formState, inputHandle, setFormData];
};

export default useForm;
