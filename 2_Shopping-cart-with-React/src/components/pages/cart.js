"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Row, Col, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {connect as cart_connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions'

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false
    }
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    if (this.props.cart[0])
      return this.renderCart();
    else
      return this.renderEmpty();
  }

  onDelete(_id) {
    //this.props.deleteCartItem(_id);
    const currentBookToDelete = this.props.cart;
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart) {
        return cart._id === _id;
      }
    );

    let cartAfterDelete = [
        ...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete);
  }

  renderCart() {
    const cartItemsList = this.props.cart.map(function(cartArr) {
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>     </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty <Label bsStyle='success'>{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{minwidth: '300 px'}}>
                <Button
                  onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                  bsStyle='default'
                  bsSize='small'>-</Button>
                <Button
                  onClick={this.onIncrement.bind(this, cartArr._id)}
                  bsStyle='default'
                  bsSize='small'>+</Button>
                <span>     </span>
                <Button
                  onClick={this.onDelete.bind(this, cartArr._id)}
                  bsStyle='danger'
                  bsSize='small'>
                    DELETE
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this);

    return(
      <Panel header='cart' bsStyle='primary'>
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Monto Total: {this.props.totalAmount}</h6>
            <Button
              onClick={this.open.bind(this)}
              bsStyle='success'
              bsSize='small'>
                Proceder a Pagar
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Muchas gracias!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Tu orden ha sido recibida</h6>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>Total $: {this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }

  renderEmpty() {
    return(<div></div>)
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1);
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQty: state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCartItem: deleteCartItem,
    updateCart: updateCart
  }, dispatch);
}

export default cart_connect(mapStateToProps, mapDispatchToProps)(Cart);