import { createStore } from 'redux';

export default function storeFactory({
  enhancer = f => f
}) {
  return createStore(
    () => {},
    enhancer
  );
}

