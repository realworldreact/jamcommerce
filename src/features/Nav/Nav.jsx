import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import {
  hoverOnSubNav,
  clickOnSubNav,
  mouseLeaveMenu,
  isMenuOpenSelector,
} from './redux';
import styles from './nav.module.styl';
import cart from './cart.svg';
import hamburger from './hamburger.svg';
import Menu, { Image, Text } from '../Menu';

const womansLink = '/wommans';
const _items = [
  {
    name: 'New Arrivals',
    href: womansLink,
  },
  {
    name: 'Womans',
    href: womansLink,
  },
  {
    name: 'Mens',
    href: womansLink,
  },
  {
    name: 'Collections',
    href: womansLink,
  },
  {
    name: 'Sales',
    href: womansLink,
  },
];

const cx = classnames.bind(styles);
const mapStateToProps = createSelector(isMenuOpenSelector, isMenuOpen => ({
  items: _items,
  isMenuOpen,
}));
function mapDispatchToProps(dispatch, { items = _items }) {
  const clickOnSubNavActions = items.reduce((dispatchers, { name }) => {
    dispatchers[name] = e => {
      e.preventDefault();
      return dispatch(clickOnSubNav(name));
    };

    return dispatchers;
  }, {});
  const hoverOnSubNavActions = items.reduce((dispatchers, { name }) => {
    dispatchers[name] = e => {
      e.preventDefault();
      return dispatch(hoverOnSubNav(name));
    };

    return dispatchers;
  }, {});
  return {
    mouseLeaveMenu: () => dispatch(mouseLeaveMenu()),
    hoverOnSubNavActions,
    clickOnSubNavActions,
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
