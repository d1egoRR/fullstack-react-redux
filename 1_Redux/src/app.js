"use strict"
import {createStore} from 'redux';

const reducer = function(state={books: []}, action) {
  switch (action.type) {
    /*case 'INCREMENT':
      return state + action.payload;
      break;
    case 'DECREMENT':
      return state - action.payload;
      break;*/
    case 'POST_BOOK':
      //let books = state.books.concat(action.payload);
      //return {books}
      return {books: [...state.books, ...action.payload]}
      break;
  }

  return state;
}

const store = createStore(reducer);

store.subscribe(function() {
  console.log('current state is ', store.getState());
  //console.log('current price ', store.getState()[1].price);
});

//store.dispatch({type: 'INCREMENT', payload: 1});
//store.dispatch({type: 'INCREMENT', payload: 1});
//store.dispatch({type: 'INCREMENT', payload: 2});
//store.dispatch({type: 'DECREMENT', payload: 1});
store.dispatch({
  type: 'POST_BOOK',
  payload: [{
    id: 1,
    title: 'Java programming',
    description: 'libro malo',
    price: 35.50
  },
  {
    id: 2,
    title: 'Python OO 2016',
    description: 'libro excelente',
    price: 42.80
  }]
});

store.dispatch({
  type: 'POST_BOOK',
  payload: [{
    id: 3,
    title: 'PHP5 POO',
    description: 'enrique place',
    price: 42.00
  }]
});