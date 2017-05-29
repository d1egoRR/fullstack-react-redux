"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Row, Col, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {connect as cart_connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem} from '../../actions/cartActions'

class Cart extends React.Component {
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
              <h6>qty <Label bsStyle='success'></Label></h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{minwidth: '300 px'}}>
                <Button bsStyle='default' bsSize='small'>-</Button>
                <Button bsStyle='default' bsSize='small'>+</Button>
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
      </Panel>
    )
  }

  renderEmpty() {
    return(<div></div>)
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCartItem: deleteCartItem
  }, dispatch);
}

export default cart_connect(mapStateToProps, mapDispatchToProps)(Cart);