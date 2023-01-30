import { createOrderDocument, getOrders } from '../../firebase/firebase-utils';
import { v4 as uuidv4 } from 'uuid';

export const START_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCES = 'CREATE_ORDER_SUCCES';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';
export const PURCHASE_INIT = 'PURCHASE_INIT';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';

export const createOrderSuccess = (orderData) => ({
  type: CREATE_ORDER_SUCCES,
  orderData: orderData,
});

export const createOrderStart = () => ({
  type: START_ORDER,
});

export const createOrderFail = (error) => ({
  type: CREATE_ORDER_FAIL,
  error: error,
});

export const createOrder = (orderData) => {
  // esta acción createOrder, que es una función, que retorna una función asyncrona luego abajo, gracias a redux-toolkit,
  // ya tiene predefinido react-thunk, y podes usarla. Si usás createStore, tenés que instalar react-thunk
  // para pasarla en middleware.
  // Para usar una función asyncrona, tenes que usar en una acción, mediante un thunk, que es una función que retorna
  // otra función.

  // redux-thunk permite que los dispatch se disparen adentro del resultado de la accion
  return async (dispatch) => {
    dispatch(createOrderStart());
    try {
      const orderRef = await createOrderDocument({
        id: uuidv4(),
        ...orderData,
      });

      orderRef.onSnapshot((snapShot) => {
        dispatch(createOrderSuccess({ id: snapShot.id, ...snapShot.data() }));
      });
    } catch (error) {
      dispatch(createOrderFail(error));
    }
  };
};

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
});

export const fetchOrderSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};

// Acá de vuelta se utiliza redux-thunk, para retornar una funcion asyncrona para hacer un fetch en firebase database,
// utilizando getOrders
export const fetchOrders = (userId) => {
  return async (dispatch) => {
    dispatch(fetchOrderStart());
    try {
      const fetchedOrders = await getOrders(userId);
      dispatch(fetchOrderSuccess(fetchedOrders));
    } catch (err) {
      dispatch(fetchOrderFail(err));
    }
  };
};
