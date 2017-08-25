import _ from 'lodash';
import { createAction, combineActions, handleActions } from 'redux-actions';
import { createTypes } from 'redux-create-types';
import { createSelector } from 'reselect';

import menuMen from '../menu-men.png';
import menuWomen from '../menu-women.png';
import menuEssentialShoes from '../essential-shoes.png';
import menuSummerAccessories from '../summer-accessories.png';

const ns = 'nav';

const types = createTypes(
  [
    'clickOnSubNav',
    'hoverOnSubNav',
    'mouseLeaveMenu',
  ],
  ns,
);

const womenLink = '/women';
const initialState = {
  isMenuOpen: false,
  currentDirectory: 'New Arrivals',
  directories: [
    'New Arrivals',
    'Women',
    'Men',
    'Collections',
  ],
  directoriesById: {
    'New Arrivals': {
      title: 'New Arrivals',
      href: womenLink,
      view: 'Image',
      categories: [
        'Women',
        'Men',
      ],
    },
    Women: {
      title: 'Women',
      href: womenLink,
      view: 'Text',
      categories: [
        'Clothing',
        'Accessories',
      ],
    },
    Men: {
      title: 'Men',
      href: womenLink,
      view: 'Text',
      categories: [
        'Clothing',
        'Accessories',
      ],
    },
    Collections: {
      title: 'Collections',
      href: womenLink,
      view: 'Image',
      categories: [
        'Summer Colors',
        'Essential Handbags',
      ],
    },
  },
  categoriesById: {
    Women: {
      title: 'Women',
      img: menuWomen,
    },
    Men: {
      title: 'Men',
      img: menuMen,
    },
    'Summer Colors': {
      title: 'Summer Colors',
      img: menuSummerAccessories,
    },
    'Essential Handbags': {
      title: 'Essential Handbags',
      img: menuEssentialShoes,
    },
    Clothing: {
      title: 'Clothing',
      sub: [
        'Active Wear',
        'Beach & Sun',
        'Blazers',
        'Coats & Blazers',
        'Demin',
        'Dresses',
        'Pajamas',
        'Pants & Leggings',
        'Shirts',
        'Skirts',
        'Sleep & Lounge',
        'Tees & Tops',
      ],
    },
    Accessories: {
      title: 'Accessories',
      sub: [
        'Bags',
        'Belts',
        'Handbags & Wallets',
        'Hats & Hair Accessories',
        'Jewelry',
        'Luggage & Travel',
        'Scarves & Wraps',
        'Shoes & Sandels',
        'Sunglasses',
        'Watches',
      ],
    },
  },
  subById: {
    'Active Wear': { title: 'Active Wear', href: 'womenLink' },
    Bags: { title: 'Bags', href: 'womenLink' },
    'Beach & Sun': { title: 'Beach & Sun', href: 'womenLink' },
    Belts: { title: 'Belts', href: 'womenLink' },
    Blazers: { title: 'Blazers', href: 'womenLink' },
    'Coats & Blazers': { title: 'Coats & Blazers', href: 'womenLink' },
    Demin: { title: 'Demin', href: 'womenLink' },
    Dresses: { title: 'Dresses', href: 'womenLink' },
    'Handbags & Wallets': { title: 'Handbags & Wallets', href: 'womenLink' },
    'Hats & Hair Accessories': {
      title: 'Hats & Hair Accessories',
      href: 'womenLink',
    },
    Jewelry: { title: 'Jewelry', href: 'womenLink' },
    'Luggage & Travel': { title: 'Luggage & Travel', href: 'womenLink' },
    Pajamas: { title: 'Pajamas', href: 'womenLink' },
    'Pants & Leggings': { title: 'Pants & Leggings', href: 'womenLink' },
    'Scarves & Wraps': { title: 'Scarves & Wraps', href: 'womenLink' },
    Shirts: { title: 'Shirts', href: 'womenLink' },
    'Shoes & Sandels': { title: 'Shoes & Sandels', href: 'womenLink' },
    Skirts: { title: 'Skirts', href: 'womenLink' },
    'Sleep & Lounge': { title: 'Sleep & Lounge', href: 'womenLink' },
    Sunglasses: { title: 'Sunglasses', href: 'womenLink' },
    'Tees & Tops': { title: 'Tees & Tops', href: 'womenLink' },
    Watches: { title: 'Watches', href: 'womenLink' },
  },
};

export const clickOnSubNav = createAction(types.clickOnSubNav);
export const hoverOnSubNav = createAction(types.hoverOnSubNav);
export const mouseLeaveMenu = createAction(types.mouseLeaveMenu, _.noop);

export const getNS = state => state[ns];

export const isMenuOpenSelector = state => getNS(state).isMenuOpen;

export const subByIdSelector = state => getNS(state).subById;
export const currentDirectorySelector = state => getNS(state).currentDirectory;
export const directoriesByIdSelector = state => getNS(state).directoriesById;

export const directoriesSelector = createSelector(
  directoriesByIdSelector,
  state => getNS(state).directories,
  (table, ids) => ids.map(id => table[id] || {}),
);
export const directorySelector = createSelector(
  directoriesByIdSelector,
  currentDirectorySelector,
  (table, id) => table[id] || {},
);

export const categoriesByIdSelector = state => getNS(state).categoriesById;
export const categoriesSelector = createSelector(
  directorySelector,
  categoriesByIdSelector,
  subByIdSelector,
  ({ categories = [] }, categoryById, subById) =>
    categories.map(id => categoryById[id] || {}).map(category => {
      if (!Array.isArray(category.sub)) {
        return category;
      }
      return {
        ...category,
        sub: category.sub.map(id => subById[id]),
      };
    }),
);

export default function createReducer() {
  const reducer = handleActions(
    {
      [combineActions(types.clickOnSubNav, types.hoverOnSubNav)]: (
        state,
        { payload: item },
      ) => ({
        ...state,
        isMenuOpen: true,
        currentDirectory: item,
      }),
      [types.mouseLeaveMenu]: state => ({
        ...state,
        isMenuOpen: false,
      }),
    },
    initialState,
  );
  reducer.toString = () => ns;
  return reducer;
}
