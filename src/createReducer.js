import { combineReducers } from 'redux';
import { default as navReducer } from './layouts/Nav/redux';

export default function createReducer() {
  return combineReducers(
    [ navReducer ].map(f => f()).reduce((reducers, reducer) => {
      reducers[reducer] = reducer;
      return reducers;
    }, {}),
  );
}
