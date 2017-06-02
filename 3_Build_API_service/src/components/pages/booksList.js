"use strict"

import React from 'react';
import {connect as book_connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/bookActions'
import {Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';

class BooksList extends React.Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const booksList = this.props.books.map(function(booksArr) {
      return(
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            price={booksArr.price} />
        </Col>
      )
    });
    return(
      <Grid>
        <Row>
          <Cart/>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Col xs={12} sm={6}>
            <BookForm/>
          </Col>
          {booksList}
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBooks: getBooks
  }, dispatch);
}

export default book_connect(mapStateToProps, mapDispatchToProps)(BooksList);