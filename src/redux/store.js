import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';

const preloadedState = {};

export const store = configureStore({ reducer: rootReducer, preloadedState });

export const persistor = persistStore(store);
