"use strict"
import axios from 'axios';

export function getBooks() {
  return function(dispatch) {
    axios.get('/api/books', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      dispatch({type: 'GET_BOOKS', payload: response.data})
    })
    .catch(function(err) {
      dispatch({type: 'GET_BOOKS_REJECTED', payload: err})
    })
  }
}

export function postBook(book) {
  return function(dispatch) {
    axios.post('/api/books', book, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      dispatch({type: 'POST_BOOK', payload: response.data})
    })
    .catch(function(err) {
      dispatch({type: 'POST_BOOK_REJECTED', payload: err})
    })
  }
}

export function deleteBook(_id) {
  return function(dispatch) {
    axios.delete('/api/books/' + _id, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      dispatch({type: 'DELETE_BOOK', payload: _id})
    })
    .catch(function(err) {
      dispatch({type: 'DELETE_BOOK_REJECTED', payload: err})
    })
  }
}

export function updateBook(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}