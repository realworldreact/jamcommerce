export const isCartAction = ({ meta: { cart: { isCart } = {} } = {} }) =>
  !!isCart;

export const cartTypes = {
  addToCart: 'addToCart',
  removeFromCart: 'removeFromCart',
  clearCart: 'clearCart',
};

export const createCartMeta = (type = cartTypes.addToCart) => payload => ({
  cart: {
    type,
    isCart: true,
    payload,
  },
});

export const getCartMeta = ({
  meta: { cart: { type, isCart, payload } = {} } = {},
}) => isCart ? { type, payload } : null;
