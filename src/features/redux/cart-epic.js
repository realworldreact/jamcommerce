import { map } from 'rxjs/operator/map';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import GoCommerce from 'gocommerce-js';

import { types } from './';

export default function cartEpic(action) {
  let commerce;
  return action.ofType(types.appMounted)::map(() => {
    commerce = new GoCommerce({
      APIUrl: 'http://localhost:3010',
    });
    console.log('commerce: ', commerce);
  })::ignoreElements();
}
