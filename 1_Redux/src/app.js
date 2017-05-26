"use strict"
import {createStore} from 'redux';
import reducers from './reducers/index'
import {addToCart} from './actions/cartActions';
import {postBook, deleteBook, updateBook} from './actions/bookActions';

/**********************************************/
// REDUX MIDDLEWARE
import logger from 'redux-logger';
import {applyMiddleware} from 'redux';
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);
/**********************************************/

/*const store = createStore(reducers);

store.subscribe(function() {
  console.log('current state is ', store.getState());
});*/

store.dispatch(postBook(
    [
      {
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
      }
    ]
));

store.dispatch(deleteBook({id: 1}));
store.dispatch(updateBook(
  {
    id: 2,
    title: 'Python para todos',
    description: 'Libro para novatos'
  }
));

store.dispatch(addToCart([{id: 45}]));