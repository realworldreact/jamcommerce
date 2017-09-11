import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import createReducer from './createReducer.js';
import { epics } from './features/redux';

export default function storeFactory({ enhancer = f => f } = {}) {
  const epicMiddleware = createEpicMiddleware(...epics);
  return createStore(
    createReducer(),
    compose(applyMiddleware(epicMiddleware), enhancer),
  );
}
