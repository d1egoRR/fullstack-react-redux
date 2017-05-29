"use strict"

export function cartReducers(state={cart: []}, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {cart: [...state, ...action.payload]}
      break;
    case 'DELETE_CART_ITEM':
      /*const currentBookToDelete = state.cart;
      const indexToDelete = currentBookToDelete.findIndex(
        function(cart) {
          return cart._id === action.payload;
        }
      );

      let cartAfterDelete = [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1)]

      return {cart: cartAfterDelete}
      break;*/
      return {cart: [...state, ...action.payload]}
      break;
  }

  return state;
}