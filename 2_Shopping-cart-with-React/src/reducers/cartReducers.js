"use strict"

export function cartReducers(state={cart: []}, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        cart: [...state, ...action.payload],
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
    case 'UPDATE_CART':
      const currentBookToUpdate = [...state.cart];
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book) {
          return book._id == action._id;
        }
      );

      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
      };

      let cartUpdate = [
          ...currentBookToUpdate.slice(0, indexToUpdate),
          newBookToUpdate,
          ...currentBookToUpdate.slice(indexToUpdate + 1)
        ]

      return {
        ...state, cart: cartUpdate,
        totalAmount: totals(cartUpdate).amount,
        totalQty: totals(cartUpdate).qty
      };
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
      return {
        cart: [...state, ...action.payload],
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
  }

  return state;
}

export function totals(payloadArr) {
  const totalAmount = payloadArr.map(function(cartArr) {
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a, b) {
    return a + b;
  }, 0);

  const totalQty = payloadArr.map(function(cartArr) {
    return cartArr.quantity;
  }).reduce(function(a, b) {
    return a + b;
  }, 0);

  return {
    amount: totalAmount.toFixed(2),
    qty: totalQty
  };
}