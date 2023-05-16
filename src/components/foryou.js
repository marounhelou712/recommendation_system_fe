import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ForYou = props => {
  const { bestSeller, Recommended1, Recommended2, Recommended3 } = props.context;

  let user = localStorage.getItem("user")

  console.log(Recommended1);
  return (
    <Fragment>
      <div className="hero is-small is-link">
        <div className="hero-body container">
          <h3 className="title">YOU NAVIGATE, WE RECOMMEND, YOU CHOOSE...</h3>
        </div>
      </div>
      <br />
      <div className="container">
            <div className="container" style={{backgroundColor: '#f0f8ff'}}>
                <div className="has-text-centered is-size-4 has-text-weight-semibold	">
                    BEST SELLERS / TRENDING PRODUCTS
                </div>
                
            </div>
            <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>
        <div className="column columns is-multiline">
          {bestSeller && bestSeller.length && (
            bestSeller.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                viewProduct={props.context.viewProduct}
              />
            ))
          )}
        </div>

        {user && 
        <>
        <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>
        <div className="container" style={{backgroundColor: '#f0f8ff'}}>
                <div className="has-text-centered is-size-4 has-text-weight-semibold	">
                    PEOPLE SIMILAR TO YOU LIKE THAT
                </div>
        </div>
        <hr class="is-divider" style={{height: '5px', backgroundColor: '#3273dc'}}></hr>

        <div className="column columns is-multiline">
          {Recommended1 && Recommended1.length ? (
            Recommended1.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                viewProduct={props.context.viewProduct}
              />
            ))
          ) : (
            <div className="column" style={{height: '100vh'}}>
              <span className="title has-text-grey-light is-center">
                Retrieving the best products for you...
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
          {Recommended2 && Recommended3.length ? (
            Recommended1.map((product, index) => (
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
          </>
        }

          


      </div>
          
    </Fragment>
  );
};

export default withContext(ForYou);
