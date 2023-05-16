import React from "react";
import { colorToBackgroundColor } from "./services";


const ProductItem = props => {
  const { product } = props;

  const [view, setView] = React.useState(false);
  
  return (
    <div className=" column is-half" >
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64 ">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="product"
              />
            </figure>
          </div>
          <div className="media-content">
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
