import _ from 'lodash';
import invariant from 'invariant';

const typeDelimiter = '||';

const cache = new Map();

export function combineActions(...types) {
  return types.map(_.toString).join(typeDelimiter);
}

export function handleAction(type, reducer = _.identity, defaultState) {
  const types = _.toString(type).split(typeDelimiter);
  invariant(
    !_.isUndefined(defaultState),
    `defaultState for reducer handling ${types.join(', ')} should be defined`,
  );
  invariant(
    _.isFunction(reducer) || _.isPlainObject(reducer),
    'Expected reducer to be a function or object with next and throw reducers',
  );

  const [
    nextReducer,
    throwReducer,
  ] = _.isFunction(reducer) ?
    [ reducer ] :
    [
      reducer.next,
      reducer.throw,
    ].map(
      reducer => _.isNil(reducer) ? undefined : reducer,
    );

  return function actionHandler(state = defaultState, action) {
    const { type: actionType } = action;
    if (!actionType || !_.includes(types, actionType.toString())) {
      return state;
    }

    const handler = throwReducer && action.error ? throwReducer : nextReducer;
    return handler(state, action);
  };
}

export function handleActions(types, createHandlers, defaultState, ns) {
  invariant(
    _.isFunction(createHandlers),
    'expected createHandlers to be a function',
  );
  const handlers = createHandlers(types);
  invariant(
    _.isPlainObject(handlers),
    'Expected handlers to be an plain object.',
  );
  const reducers = Object.keys(handlers).map(type =>
    handleAction(type, handlers[type], defaultState),
  );
  function reducer(state = defaultState, action) {
    return reducers.reduce((state, reducer) => reducer(state, action), state);
  }
  reducer.toString = () => ns;
  return reducer;
}

// interface createReducerHash {
//  (...Reducer) => createReducerHash,
//  getFinalReducer() => Reducer // create combined reducer
//  clearCache() => Void // clear cache after SSR
// }
export function createReducerHash(...reducers) {
  if (!Array.isArray(reducers)) {
    reducers = [ reducers ];
  }
  invariant(
    reducers.every(reducer => reducer.toString !== Function.prototype.toString),
    'Reducers must have a user defined toString function. %s',
    reducers,
  );
  reducers.forEach(reducer => cache.set(reducer.toString(), reducer));
  return createReducerHash;
}

createReducerHash.getFinalReducer = () => {
  const reducers = Array.from(cache.values());
  function finalReducer(state = {}, action) {
    let hasChanged = false;
    const newState = reducers.reduce((newState, reducer) => {
      const prevState = state[reducer];
      const nextState = reducer(prevState, action);
      newState[reducer] = nextState;
      hasChanged = hasChanged || nextState !== prevState;
      return newState;
    }, {});
    return hasChanged ? newState : state;
  }
  return finalReducer;
};

createReducerHash.clearCache = () => cache.clear();
