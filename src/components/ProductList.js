import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const { products, category } = props.context;
  return (
    <Fragment>
      <div className="hero is-link">
        <div className="hero-body container">
          <h4 className="title">{category}</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column" style={{height: '100vh'}}>
              <span className="title has-text-grey-light">
                Please choose a category
              </span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default withContext(ProductList);
