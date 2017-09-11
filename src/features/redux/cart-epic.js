import { map } from 'rxjs/operator/map';
import { ignoreElements } from 'rxjs/operator/ignoreElements';

import { types } from './';

export default function cartEpic(action, store, { commerce }) {
  return action.ofType(types.appMounted)::map(() => {
    console.log('commerce: ', commerce);
  })::ignoreElements();
}
