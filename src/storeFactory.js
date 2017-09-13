import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import createReducer from './createReducer.js';
import { epics as appEpics } from './features/redux';

export default function storeFactory(
  { epicDependencies = {}, enhancer = f => f } = {},
) {
  const rootEpic = combineEpics(...appEpics);
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: epicDependencies,
  });
  return createStore(
    createReducer(),
    compose(applyMiddleware(epicMiddleware), enhancer),
  );
}
