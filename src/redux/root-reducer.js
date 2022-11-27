import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/products-reducer';
import cartReducer from './cart/cartReducer';
import categoriesReducer from './categories/categoriesReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

export default persistReducer(persistConfig, rootReducer);
