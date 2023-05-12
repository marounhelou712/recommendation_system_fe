import React from "react";


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

  const colorToBackgroundColor = (color) => {
    switch (color) {
      case 'Beige':
        return "#F5F5DC";
  
      case 'Black':
        return "#000000";
  
      case 'Brown':
        return "#A52A2A";
  
      case 'Burgundy':
        return "#800020";
  
      case 'Charcoal':
        return "#36454F";
  
      case 'Gold':
        return "#FFD700";
  
      case 'Green':
        return "#008000";
  
      case 'Grey':
        return "#808080";
  
      case 'Khaki':
        return "#C3B091";
  
      case 'Lavender':
        return "#E6E6FA";
  
      case 'Magenta':
        return "#FF00FF";
  
      case 'Maroon':
        return "#800000";
  
      case 'Mustard':
        return "#FFDB58";
  
      case 'Navy':
        return "#000080";
  
      case 'Orange':
        return "#FFA500";
  
      case 'Pink':
        return "#FFC0CB";
  
      case 'Purple':
        return "#800080";
  
      case 'Red':
        return "#FF0000";
  
      case 'Rose':
        return "#FF007F";
  
      case 'Silver':
        return "#C0C0C0";
  
      case 'White':
        return "#FFFFFF";
  
      case 'Yellow':
        return "#FFFF00";
  
      case 'Blue':
        return "#0000FF";
  
      default:
        return "";
    }
  }
  
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
            <div style={{color: colorToBackgroundColor(product.product_color), fontWeight: 'bold'}}>{product.product_color}</div>
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
