import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import {
  clickOnSubNav,
  hoverOnSubNav,
  isMenuOpenSelector,
  itemsSelector,
  mouseLeaveMenu,
} from './redux';
import styles from './nav.module.styl';
import cart from './cart.svg';
import hamburger from './hamburger.svg';
import Menu, { Image, Text } from '../Menu';

const preventDefault = e => e && e.preventDefault();
const createBoundFunc = _.memoize((name, e, ac, dispatch) => _.flow(e, ac, dispatch));

const cx = classnames.bind(styles);
const mapStateToProps = createSelector(
  isMenuOpenSelector,
  itemsSelector,
  (isMenuOpen, items = []) => ({ items, isMenuOpen }),
);

function mapDispatchToProps(dispatch) {
  const dispatchers = bindActionCreators({ mouseLeaveMenu }, dispatch);
  dispatchers.dispatch = dispatch;
  return () => dispatchers;
}

function mergeProps(stateProps, dispatchProps) {
  const { items = [] } = stateProps;
  const { dispatch } = dispatchProps;
  const clickOnSubNavActions = items.reduce((dispatchers, { name }) => {
    dispatchers[name] = createBoundFunc(
      name,
      preventDefault,
      clickOnSubNav.bind(name),
      dispatch,
    );

    return dispatchers;
  }, {});
  const hoverOnSubNavActions = items.reduce((dispatchers, { name }) => {
    dispatchers[name] = createBoundFunc(
      name,
      _.noop,
      hoverOnSubNav.bind(name),
      dispatch,
    );
    return dispatchers;
  }, {});

  return {
    ...stateProps,
    ...dispatchProps,
    clickOnSubNavActions,
    hoverOnSubNavActions,
  };
}

const propTypes = {
  clickOnSubNavActions: PropTypes.object,
  hoverOnSubNavActions: PropTypes.object,
  isMenuOpen: PropTypes.bool,
  items: PropTypes.array,
  mouseLeaveMenu: PropTypes.func.isRequired,
};

const isImg = true;

export function Nav({
  isMenuOpen,
  items,
  mouseLeaveMenu,
  clickOnSubNavActions,
  hoverOnSubNavActions,
}) {
  const MenuComp = isImg ? Image : Text;
  return (
    <div className={ cx('navbar') }>
      <nav className={ cx('top') }>
        <div className={ cx('hamburger') }>
          <img
            alt='menu hamburger'
            src={ hamburger }
          />
        </div>
        <div className={ cx('title') }>JAM Commerce</div>
        <ul className={ cx('account') }>
          <li>
            <a href='/signin'>Sign In</a>
          </li>
          <li>
            <a
              className={ cx('cart') }
              href='/cart'
              >
              <img
                alt='a padlock'
                src={ cart }
              />
            </a>
          </li>
        </ul>
      </nav>
      <nav className={ cx('bottom') }>
        <ul>
          { items.map(({ name, href }) =>
            (
              <a
                className={ cx('item-link') }
                href={ href }
                key={ name }
                onClick={ clickOnSubNavActions[name] }
                onMouseEnter={ hoverOnSubNavActions[name] }
                >
                <li className={ cx('item') }>
                  { name }
                </li>
              </a>
            ),
          ) }
        </ul>
      </nav>
      <Menu
        isOpen={ isMenuOpen }
        onMouseLeave={ mouseLeaveMenu }
        >
        <MenuComp />
      </Menu>
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Nav);
