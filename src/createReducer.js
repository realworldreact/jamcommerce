import { combineReducers } from 'berkeleys-redux-utils';
import { combineForms } from 'react-redux-form';

import appReducer from './features/redux';
import cartReducer from './features/Cart/redux';
import productReducer from './features/Product/redux';
import navReducer from './features/Nav/redux';
import { formModels as authFormModels } from './features/Auth/redux';

const formsReducer = combineForms({ ...authFormModels });
formsReducer.toString = () => 'forms';

export default function createReducer() {
  return combineReducers(
    appReducer,
    cartReducer,
    formsReducer,
    navReducer,
    productReducer,
  );
}
