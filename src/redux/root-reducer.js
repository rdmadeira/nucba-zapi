import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/products-reducer';
import cartReducer from './cart/cartReducer';
import categoriesReducer from './categories/categoriesReducer';
import userReducer from './user/user-reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
