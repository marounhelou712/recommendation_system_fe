import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import { getBrandsFromCategory } from "./services";

const ProductList = props => {
  const { products, category, initialProducts } = props.context;
  let brands = getBrandsFromCategory(initialProducts);
  return (
    <Fragment>
      <div className="hero is-link">
        <div className="hero-body container">
          <h4 className="title">{category}</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="navbar-end" style={{backgroundColor: '#f0f8ff'}}>
        <div class="navbar-item" style={{width: '200px'}}>
        <div class="select is-link is-outlined">
          <select value={props.context.brand} onChange={(e) => props.context.filterBrand(e.target.value)}>
            <option value="All Brands">All Brands</option>
            {
              brands.map((brand, index) => {
                return(
                  <option key={index} value={brand}>{brand}</option>
                )
              })
            }
          </select>
        </div>
        </div>
        <div class="navbar-item" style={{width: '150px'}}>
          <input class="input is-link has-text-grey-light	" type="text" placeholder= "min. price"
          onChange={(e) => {props.context.changeMinPrice(e.target.value)}}/>
          </div>

          <div class="navbar-item" style={{width: '150px'}}>
          <input class="input is-link has-text-grey-light" type="text" placeholder="max. price"
          onChange={(e) => props.context.changeMaxPrice(e.target.value)}/>
          </div>  

          <div class="navbar-item">
            <button class="button is-link is-outlined"
            onClick={() => props.context.filterPrice()}>
              Filter
            </button>
          </div> 

          <div class="navbar-item">
            <button class="button is-link is-outlined"onClick={() => props.context.reset()}>
              Reset
            </button>
          </div> 
        </div>

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

export default withContext(ProductList);
