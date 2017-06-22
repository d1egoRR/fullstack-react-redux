import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postBook, deleteBook, getBooks} from '../../actions/bookActions'
import {findDOMNode} from 'react-dom';
import axios from 'axios';

class BookForm extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [{}],
      img: ''
    }
  }

  componentDidMount() {
    this.props.getBooks();

    axios.get('/api/images')
      .then(function(response) {
        this.setState({images: response.data})
      }.bind(this))
      .catch(function(error) {
        this.setState({images: 'error loading images files from server', img: ''})
      });
  }

  handleSubmit() {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.images).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBook(book);
  }

  handleSelect(img) {
    this.setState({
      img: '/images/' + img
    });
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

    const imgList = this.state.images.map(function(imgArr, i) {
      return(
        <MenuItem
          key={i}
          eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>
            {imgArr.name}
        </MenuItem>
      )
    }, this);

    return(
      <Well>
        <Row>
          <Col xs={18} sm={12}>
            <Panel>
              <InputGroup>
                <FormControl type="text" value={this.state.img} ref="images"/>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Seleccionar imagen"
                  bsStyle="primary">
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={18} sm={12}>
            <Panel>
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
          </Col>
        </Row>
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
    deleteBook,
    getBooks
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);