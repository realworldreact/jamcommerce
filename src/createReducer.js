import { combineReducers } from 'berkeleys-redux-utils';
import { combineForms } from 'react-redux-form';

import addressReducer from './features/Address/redux';
import appReducer from './features/redux';
import authReducer, {
  formModels as authFormModels,
} from './features/Auth/redux';
import cartReducer from './features/Cart/redux';
import checkoutReducer, {
  formModels as checkoutModels,
} from './features/Checkout/redux';
import navReducer from './features/Nav/redux';
import productReducer from './features/Product/redux';
import productsReducer from './features/Products/redux';

const formsReducer = combineForms(
  {
    ...authFormModels,
    ...checkoutModels,
  },
  'forms',
);
formsReducer.toString = () => 'forms';

export default function createReducer() {
  return combineReducers(
    addressReducer,
    appReducer,
    authReducer,
    cartReducer,
    checkoutReducer,
    formsReducer,
    navReducer,
    productReducer,
    productsReducer,
  );
}
