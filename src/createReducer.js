import createReducerHash from './features/redux';

export default function createReducer() {
  return createReducerHash().getFinalReducer();
}
