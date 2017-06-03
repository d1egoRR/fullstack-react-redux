"use strict"
import axios from 'axios';

export function getBooks() {
  return {
    type: 'GET_BOOKS_BOOK'
  }
}

export function postBook(book) {
  console.log("aaaaaaaaa");
  return function(dispatch) {
    axios.post('/books', book)
      .then(function(response) {
        dispatch({type: 'POST_BOOK', payload: response.data})
      })
      .catch(function(err) {
        dispatch({
          type: 'POST_BOOK_REJECTED',
          payload: 'ocurrio un error cuando se agregaba un nuevo libro'
        })
      })
  }
}

export function deleteBook(_id) {
  return {
    type: 'DELETE_BOOK',
    payload: _id
  }
}

export function updateBook(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}