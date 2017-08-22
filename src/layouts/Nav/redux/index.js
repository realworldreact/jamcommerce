import { createAction, handleActions } from 'redux-actions';
import { createTypes } from 'redux-create-types';

const ns = 'nav';

const types = createTypes([
  'clickOnSubNav'
], ns);

const initialState = {};
export const clickOnSubNav = createAction(types.clickOnSubNav);

export default function createReducer() {
  const reducer = handleActions({}, initialState);
  reducer.toString = () => ns;
  return reducer;
}
