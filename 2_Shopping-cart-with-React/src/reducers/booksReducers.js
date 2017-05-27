"use strict"

export function booksReducers(
  state={books: [{
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
  }]}, action) {
  switch (action.type) {
    case 'GET_BOOKS_BOOK':
      return {...state, books: [...state.books]};
      break;
    case 'POST_BOOK':
      return {books: [...state.books, ...action.payload]};
      break;
    case 'DELETE_BOOK':
      const currentBookToDelete = [...state.books];
      const indexToDelete = currentBookToDelete.findIndex(
        function(book) {
          return book.id == action.payload.id;
        }
      );

      return {
        books: [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1)
        ]
      };
      break;
    case 'UPDATE_BOOK':
      const currentBookToUpdate = [...state.books];
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book) {
          return book.id == action.payload.id;
        }
      );

      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      };

      console.log('new book to update', newBookToUpdate);

      return {
        books: [
          ...currentBookToUpdate.slice(0, indexToUpdate),
          newBookToUpdate,
          ...currentBookToUpdate.slice(indexToUpdate + 1)
        ]
      };

      break;
  }

  return state;
}