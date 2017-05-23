"use strict"
import {createStore} from 'redux';

const reducer = function(state={}, action) {
  switch (action.type) {
    /*case 'INCREMENT':
      return state + action.payload;
      break;
    case 'DECREMENT':
      return state - action.payload;
      break;*/
    case 'POST_BOOK':
      return state = action.payload;
      break;
  }

  return state;
}

const store = createStore(reducer);

store.subscribe(function() {
  console.log('current state is ', store.getState());
  console.log('current price ', store.getState().price);
});

//store.dispatch({type: 'INCREMENT', payload: 1});
//store.dispatch({type: 'INCREMENT', payload: 1});
//store.dispatch({type: 'INCREMENT', payload: 2});
//store.dispatch({type: 'DECREMENT', payload: 1});
store.dispatch({
  type: 'POST_BOOK',
  payload: {
    id: 1,
    title: 'Java programming',
    description: 'libro malo',
    price: 35.50
  }
});