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
import Menu from './components/pages/menu'
import Footer from './components/pages/footer'
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Main from './main';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={BooksList}/>
        <Route path='/admin' component={BookForm}/>
        <Route path='/cart' component={Cart}/>
      </Route>
    </Router>
  </Provider>
)

render(Routes, document.getElementById('app'));