import React, { Fragment } from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = props => {
  const { cart } = props.context;
  // const cartKeys = Object.keys(cart || {});
  return (
    <Fragment>
      <div className="hero is-link">
        <div className="hero-body container">
          <h4 className="title">My Cart</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cart.length ? (
          <div className="column columns is-multiline">
            {cart.map((item, index) => (
              <CartItem
                // cartKey={key}
                // key={key}
                cartItem={item}
                index={index}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={() => props.context.clearCart()}
                  className="button is-link  is-outlined"
                >
                  Clear cart
                </button>{" "}
                <button
                  className="button is-link"
                  onClick={() => props.context.checkout()}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default withContext(Cart);
