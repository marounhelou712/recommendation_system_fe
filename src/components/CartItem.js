import React from "react";
import { colorToBackgroundColor } from "./services";

const CartItem = props => {
  // const { cartItem, cartKey } = props;
  const { cartItem, index } = props;

  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="product"
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {cartItem.product_category}{" "}
              <span className="tag is-link is-pulled-right">${cartItem.price}</span>
            </b>
            <div>{cartItem.product_name}</div>
            <div>From {cartItem.product_brand}</div>
            <div style={{color: colorToBackgroundColor(cartItem.product_color), fontWeight: 'bold'}}>{cartItem.product_color}</div>
            
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(index)}
          >
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
