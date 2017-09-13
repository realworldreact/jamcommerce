import { _do } from 'rxjs/operator/do';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { filter } from 'rxjs/operator/filter';

export default function errorEpic(actions) {
  return actions::filter(({ error }) => !!error)::_do(err =>
    console.error(err),
  )::ignoreElements();
}
