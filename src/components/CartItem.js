import React from "react";
import { colorToBackgroundColor } from "./services";
import {ReactComponent as Backpack} from './img/backpack.svg';
import {ReactComponent as Bag} from './img/bag.svg';
import {ReactComponent as Belt} from './img/belt.svg';
import {ReactComponent as Blazer} from './img/blazer.svg';
import {ReactComponent as Dress} from './img/dress.svg';
import {ReactComponent as Jacket} from './img/jacket.svg';
import {ReactComponent as Jeans} from './img/jeans.svg';
import {ReactComponent as Leggings} from './img/leggins.svg';
import {ReactComponent as Pajamas} from './img/pajamas.svg';
import {ReactComponent as Pants} from './img/pants.svg';
import {ReactComponent as Shirt} from './img/shirt.svg';
import {ReactComponent as Shoes} from './img/shoes.svg';
import {ReactComponent as Shorts} from './img/shorts.svg';
import {ReactComponent as Skirt} from './img/skirt.svg';
import {ReactComponent as Suit} from './img/suit.svg';
import {ReactComponent as Tshirt} from './img/t-shirt.svg';
import {ReactComponent as Top} from './img/top.svg';
import {ReactComponent as Wallet} from './img/wallet.svg';
import {ReactComponent as Watch} from './img/watch.svg';


const CartItem = props => {
  // const { cartItem, cartKey } = props;
  const { cartItem, index } = props;

  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
            {cartItem.product_category === "Backpack" && <Backpack style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Bag" && <Bag style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Belt" && <Belt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Blazer" && <Blazer style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Dress" && <Dress style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Jacket" && <Jacket style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Jeans" && <Jeans style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Legging" && <Leggings style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Pyjamas" && <Pajamas style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Pant" && <Pants style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Shirt" && <Shirt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Shoes" && <Shoes style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Shorts" && <Shorts style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Skirt" && <Skirt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Suit" && <Suit style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "T-shirt" && <Tshirt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Top" && <Top style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Wallet" && <Wallet style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {cartItem.product_category === "Watch" && <Watch style={{maxWidth: "64px", maxHeight: '64px'}}/>}
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
