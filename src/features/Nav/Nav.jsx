import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import Link from 'gatsby-link';

import {
  categoriesSelector,
  clickOnSubNav,
  directoriesSelector,
  directorySelector,
  hoverOnSubNav,
  isMenuOpenSelector,
  mouseLeaveMenu,
} from './redux';
import { numInCartSelector } from '../Cart/redux';
import styles from './nav.module.styl';
import cart from './cart.svg';
import hamburger from './hamburger.svg';
import Menu from '../Menu';

const preventDefault = e => e && e.preventDefault();
const createBoundFunc = _.memoize(
  (name, e, ac, dispatch) => _.flow(e, () => ac(name), dispatch),
  (name, e, ac) => name + ac,
);

const cx = classnames.bind(styles);
const mapStateToProps = createSelector(
  isMenuOpenSelector,
  directoriesSelector,
  directorySelector,
  categoriesSelector,
  numInCartSelector,
  (isMenuOpen, directories = [], currentDirectory, categories, numInCart) => ({
    categories,
    currentDirectory,
    directories,
    isMenuOpen,
    numInCart,
  }),
);

function mapDispatchToProps(dispatch) {
  const dispatchers = bindActionCreators({ mouseLeaveMenu }, dispatch);
  dispatchers.dispatch = dispatch;
  return () => dispatchers;
}

function mergeProps(stateProps, dispatchProps) {
  const { directories = [] } = stateProps;
  const { dispatch } = dispatchProps;
  const clickOnSubNavActions = directories.reduce((dispatchers, { title }) => {
    dispatchers[title] = createBoundFunc(
      title,
      preventDefault,
      clickOnSubNav,
      dispatch,
    );

    return dispatchers;
  }, {});
  const hoverOnSubNavActions = directories.reduce((dispatchers, { title }) => {
    dispatchers[title] = createBoundFunc(
      title,
      _.noop,
      hoverOnSubNav,
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
  categories: PropTypes.array,
  clickOnSubNavActions: PropTypes.object,
  currentDirectory: PropTypes.object,
  directories: PropTypes.array,
  hoverOnSubNavActions: PropTypes.object,
  isMenuOpen: PropTypes.bool,
  mouseLeaveMenu: PropTypes.func.isRequired,
  numInCart: PropTypes.number,
};

export function Nav({
  categories,
  clickOnSubNavActions,
  currentDirectory,
  directories,
  hoverOnSubNavActions,
  isMenuOpen,
  mouseLeaveMenu,
  numInCart,
}) {
  return (
    <div className={ cx('navbar') }>
      <nav className={ cx('top') }>
        <div className={ cx('hamburger') }>
          <img
            alt='menu hamburger'
            src={ hamburger }
          />
        </div>
        <Link to='/'>
          <div className={ cx('title') }>JAM Commerce</div>
        </Link>
        <ul className={ cx('account') }>
          <li>
            <a href='/signin'>Sign In</a>
          </li>
          <li>
            <Link
              className={ cx('cart') }
              to='/cart'
              >
              <img
                alt='a padlock'
                src={ cart }
              />
              <span className={ cx('num-in-cart') }>
                { typeof numInCart === 'number' ? numInCart : 0 }
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={ cx('bottom') }>
        <ul>
          { directories.map(({ title, href }) =>
            (
              <a
                className={ cx('item-link') }
                href={ href }
                key={ title }
                onClick={ clickOnSubNavActions[title] }
                onMouseEnter={ hoverOnSubNavActions[title] }
                >
                <li className={ cx('item') }>
                  { title }
                </li>
              </a>
            ),
          ) }
          <a
            className={ cx('item-link') }
            href='/women'
            >
            <li className={ cx('item') }>Sale</li>
          </a>
        </ul>
      </nav>
      <Menu
        isOpen={ isMenuOpen }
        onMouseLeave={ mouseLeaveMenu }
        >
        <Menu.Body
          categories={ categories }
          view={ currentDirectory.view }
        />
      </Menu>
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Nav);
