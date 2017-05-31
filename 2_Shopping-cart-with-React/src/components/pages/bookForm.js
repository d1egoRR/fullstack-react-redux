import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postBook, deleteBook} from '../../actions/bookActions'
import {findDOMNode} from 'react-dom';

class BookForm extends React.Component {
  handleSubmit() {
    const book = [{
      _id: findDOMNode(this.refs._id).value,
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBook(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBook(bookId);
  }

  render() {
    const booksList = this.props.books.map(function(book) {
      return (
        <option key={book._id}>{book._id}</option>
      )
    });

    return(
      <Well>
        <Panel>
          <FormGroup controlId='_id'>
            <ControlLabel>ID Book</ControlLabel>
            <FormControl
              type='text'
              placeholder='Enter ID Book'
              ref='_id' />
          </FormGroup>
          <FormGroup controlId='title'>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type='text'
              placeholder='Enter Title'
              ref='title' />
          </FormGroup>
          <FormGroup controlId='description'>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type='text'
              placeholder='Enter Description'
              ref='description' />
          </FormGroup>
          <FormGroup controlId='price'>
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type='text'
              placeholder='Enter Price'
              ref='price' />
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save Book</Button>
        </Panel>
        <Panel style={{marginTop:'25px'}}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a Book id to delete</ControlLabel>
            <FormControl ref='delete' componentClass="select" placeholder="select">
              <option value="select">select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button
            bsStyle='danger'
            onClick={this.onDelete.bind(this)}>
              Delete Book
          </Button>
        </Panel>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBook,
    deleteBook
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);