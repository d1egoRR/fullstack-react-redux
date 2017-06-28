"use strict"
import {createStore} from 'redux';
import reducers from './reducers/index';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

import routes from './routes'

const middleware = applyMiddleware(thunk, logger);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)

render(Routes, document.getElementById('app'));