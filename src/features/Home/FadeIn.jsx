import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  display: 'inline-block',
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const FadeIn = ({ height, children }) =>
  <LazyLoad height={height} offset={150}>
    <Transition in={true} timeout={duration}>
      {state =>
        <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
          {children}
        </div>}
    </Transition>
  </LazyLoad>;
FadeIn.propTypes = {
  height: PropTypes.number,
  children: PropTypes.element,
};

export default FadeIn;
