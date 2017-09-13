export const isCartAction = ({ meta: { cart: { isCart } = {} } = {} }) =>
  !!isCart;

export const createCartMeta = (type = 'addToCart') => product => ({
  cart: {
    type,
    isCart: true,
    product,
  },
});

export const getCartMeta = ({
  meta: { cart: { type, isCart, product } = {} } = {},
}) => isCart ? { type, product } : null;
