import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
/* import thunk from 'redux-thunk'; // Ya viene pre-estabelecido en middlawares en redux-tookit */

/* const preloadedState = {};
 */
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
