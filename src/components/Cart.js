import React, { Fragment } from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = props => {
  const { cart } = props.context;

  const [view, setView] = React.useState(false);
  console.log(view)
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
                  onClick={() => {props.context.checkout(); setView(true);}}
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
        {view &&
        <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Transaction</p>
            <button class="delete" aria-label="close" onClick={(e) => {setView(false); window.location.pathname="/home"}}></button>
          </header>

          <section class="modal-card-body">
            <div>Products Successfully Bought</div>
          </section>
          <footer>
          <div class="modal-card-foot"></div>
          </footer>
        </div>
      </div> 
      }
      </div>
    </Fragment>
  );
};

export default withContext(Cart);
