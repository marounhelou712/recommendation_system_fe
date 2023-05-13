import React from "react";
import { PostInterraction } from "./services";
import { colorToBackgroundColor } from "./services";


    // {
    //   "product_id": 904,
    //   "product_name": "Raymond Men Maroon Woven-Design Single-Breasted Bandhgala",
    //   "product_category": "Bandhgala",
    //   "category_id": "",
    //   "product_brand": "Raymond",
    //   "product_created_for": "Male",
    //   "price": 35.99,
    //   "product_description": "Maroon self-design single breasted bandhgala blazer, has a mandarin collar, full button placket, long sleeves, three pockets and a double vented hem",
    //   "product_color": "Maroon"
    // },

const ProductItem = props => {
  const { product } = props;

  const access_token = localStorage.getItem("access_token");

  const [view, setView] = React.useState(false);

  // const handleAddToCart = () => {
  //   PostInterraction(access_token, product.product_id, product.product_name, product.product_category, 
  //     product.product_brand, product.product_created_for, product.price, product.product_description, product.product_color,
  //     USERID, USERGENDER, "add to cart", 2);
  // }
  
  return (
    <div className=" column is-half">
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
            <b style={{ textTransform: "capitalize" }}>
              {product.product_category}{" "}
              <span className="tag is-link is-pulled-right">${product.price}</span>
            </b>
            <div>{product.product_name}</div>
            <div>From {product.product_brand}</div>
            <div style={{color: colorToBackgroundColor(product.product_color), fontWeight: 'bold'}}>{product.product_color}</div>
            <button onClick={(e) => setView(!view)} className="button is-small is-link is-light">
              {view ? "close": "view"}
              </button>
            {view &&
            <div>{product.product_description}</div>}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-link   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
