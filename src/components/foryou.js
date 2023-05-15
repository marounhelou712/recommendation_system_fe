import React, { Fragment, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ForYou = props => {
  const { products, bestSeller, contentBased, deepLearning } = props.context;

   
  return (
    <Fragment>
      <div className="hero is-link">
        <div className="hero-body container">
          <h4 className="title">Products You Might Like</h4>
        </div>
      </div>
      <br />
      <div className="container">
            <div className="container" style={{backgroundColor: '#f0f8ff'}}>
                <div className="has-text-centered is-size-4">
                    Best Sellers
                </div>
                
            </div>
            <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                viewProduct={props.context.viewProduct}
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
        <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>
        <div className="container" style={{backgroundColor: '#f0f8ff'}}>
                <div className="has-text-centered is-size-4">
                    Based on similar users
                </div>
        </div>
        <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>

        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                viewProduct={props.context.viewProduct}
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

        <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>
        <div className="container" style={{backgroundColor: '#f0f8ff'}}>
                <div className="has-text-centered is-size-4">
                    Based your past interactions
                </div>
        </div>
        <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                viewProduct={props.context.viewProduct}
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

export default withContext(ForYou);
