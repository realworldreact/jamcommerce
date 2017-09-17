import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Control, Errors } from 'react-redux-form';

import styles from './input.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  messages: PropTypes.object,
  type: PropTypes.string,
  model: PropTypes.string,
  label: PropTypes.string,
};

export default function Input({ messages, model, label, type, ...rest }) {
  const controlProps = { model, ...rest };
  let Comp = Control[type];
  if (!Comp) {
    controlProps['type'] = type;
    Comp = Control;
  }
  return (
    <div className={ cx('group') }>
      <label htmlFor={ model }>
        <Comp
          className={ cx('input') }
          { ...controlProps }
        />
        <span className={ cx('label') }>
          { label }
        </span>
      </label>
      <span className={ cx('bar') } />
      <span className={ cx('highlight') } />
      { messages &&
        <Errors
          messages={ messages }
          model={ model }
          show={ { touched: true, focus: false } }
        /> }
    </div>
  );
}
Input.displayName = 'Input';
Input.propTypes = propTypes;
