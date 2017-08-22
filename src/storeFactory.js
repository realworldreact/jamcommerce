import { createStore } from 'redux';

import createReducer from './createReducer.js';

export default function storeFactory({
  enhancer = f => f
}) {
  return createStore(
    createReducer(),
    enhancer
  );
}

