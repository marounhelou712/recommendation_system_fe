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


const ProductItem = props => {
  const { product } = props;

  const [view, setView] = React.useState(false);
  
  return (
    <div className=" column is-half" >
      <div className="box">
        <div className="media">
          <div className="media-left">
          <figure className="image is-64x64 ">
            {product.product_category === "Backpack" && <Backpack style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Bag" && <Bag style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Belt" && <Belt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Blazer" && <Blazer style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Dress" && <Dress style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Jacket" && <Jacket style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Jeans" && <Jeans style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Legging" && <Leggings style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Pyjamas" && <Pajamas style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Pant" && <Pants style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Shirt" && <Shirt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Shoes" && <Shoes style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Shorts" && <Shorts style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Skirt" && <Skirt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Suit" && <Suit style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "T-shirt" && <Tshirt style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Top" && <Top style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Wallet" && <Wallet style={{maxWidth: "64px", maxHeight: '64px'}}/>}
            {product.product_category === "Watch" && <Watch style={{maxWidth: "64px", maxHeight: '64px'}}/>}


          </figure>



          </div>
          <div className="media-content" style={{minHeight: '150px'}}>
            <div  onClick={(e) => {
            setView(true);
            props.viewProduct({product: product})
            }}>
            <b style={{ textTransform: "capitalize" }}>
              {product.product_category}{" "}
              <span className="tag is-link is-pulled-right">${product.price}</span>
            </b>
            <div>{product.product_name}</div>
            <div>From {product.product_brand}</div>
            <div style={{color: colorToBackgroundColor(product.product_color), fontWeight: 'bold'}}>{product.product_color}</div>

          </div>
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-link is-pulled-right has-text-weight-bold	"
                onClick={() =>{
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                  })
                }
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {view &&
            <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Product description</p>
                <button class="delete" aria-label="close" onClick={(e) => setView(false)}></button>
              </header>

              <section class="modal-card-body">
                  <b style={{ textTransform: "capitalize" }}>
                  {product.product_category}{" "}
                  <span className="tag is-link is-pulled-right">${product.price}</span>
                </b>
                <div>{product.product_name}</div>
                <div>From {product.product_brand}</div>
                <div style={{color: colorToBackgroundColor(product.product_color), fontWeight: 'bold'}}>{product.product_color}</div>
                <div>{product.product_description}</div>


              </section>


              <footer class="modal-card-foot" style={{justifyContent: 'flex-end'}}>
                <button class="button is-link is-outlined is-pulled-right" 
                onClick={() =>{
                  // handleAddToCart();
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                  });
                }
                }>Add to cart</button>
              </footer>
            </div>
          </div> 
          }
    </div>
  );
};

export default ProductItem;
