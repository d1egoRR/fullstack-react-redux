"use strict"
import {createStore} from 'redux';
import reducers from './reducers/index'
import {addToCart} from './actions/cartActions';
import {postBook, deleteBook, updateBook} from './actions/bookActions';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import BooksList from './components/pages/booksList';
import logger from 'redux-logger';
import {applyMiddleware} from 'redux';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

render(
  <Provider store={store}>
    <BooksList/>
  </Provider>,
  document.getElementById('app')
);

var books = [
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

store.dispatch(postBook(books));