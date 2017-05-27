"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Row, Col, Well, Button} from 'react-bootstrap';
import {connect as cart_connect} from 'react-redux';

class Cart extends React.Component {
  render() {
    if (this.props.cart[0])
      return this.renderCart();
    else
      return this.renderEmpty();
  }

  renderCart() {
    const cartItemsList = this.props.cart.map(function(cartArr) {
      return(
        <Panel key={cartArr.id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6>
            </Col>
          </Row>
        </Panel>
      )
    });

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

export default cart_connect(mapStateToProps)(Cart);