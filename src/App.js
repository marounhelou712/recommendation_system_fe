import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import data from "./Data";
import Context from "./Context";
import ForYou from "./components/foryou";
import "./App.css";
import { PostInterraction } from "./components/services";
import { listWatch } from "./components/listOfAllProducts";
import { DropDownPerGender } from "./components/services";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: [],
      products: [],
      category: "Our Products",
      bestSeller: [],
      contentBased: [],
      deepLearning: []
    };

    this.routerRef = React.createRef();
  }
  login = (usn, pwd) => {
    let user = data.users.find(u => u.username === usn && u.password === pwd);
    if (user) {
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({ products }, () => callback && callback());
  };

  viewProduct = product => {
    let acc = localStorage.getItem("access_token");

    if (acc) {
      PostInterraction(acc, product.product.product_id, product.product.product_name, product.product.product_category, 
        product.product.product_brand, product.product.product_created_for, product.product.price, product.product.product_description, product.product.product_color,
        5, "Male", "view", 1);
    }
  }

///api/userId
  
  addToCart = cartItem => {
    let acc = localStorage.getItem("access_token");



    if (acc) {
      let cart = this.state.cart;
      cart.push(cartItem.product);
      localStorage.setItem("cart", cart);
      this.setState({ cart: cart });

      PostInterraction(acc, cartItem.product.product_id, cartItem.product.product_name, cartItem.product.product_category, 
        cartItem.product.product_brand, cartItem.product.product_created_for, cartItem.product.price, cartItem.product.product_description, cartItem.product.product_color,
        5, "Male", "add to cart", 2);

    } else {
      this.routerRef.current.history.push("/login");
    }
  };

  checkout = () => {
    let acc = localStorage.getItem("acces_token");

    if (acc) {
    const cart = this.state.cart;
    console.log(cart);
    cart.map(p => {
      PostInterraction(acc, p.product_id, p.product_name, p.product_category, 
        p.product_brand, p.product_created_for, p.price, p.product_description, p.product_color,
        5, "Male", "purchase", 3);
    });
    this.clearCart();}
    else{
      this.routerRef.current.history.push("/login");
      return;
    }
  };

  removeFromCart = index => {
    let cart = this.state.cart;
    delete cart[index];
    localStorage.setItem("cart", cart)
    this.setState({ cart })
  }

  clearCart = () => {
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  componentDidMount() {

    let products = listWatch;

    this.setState({ products });
  }

  handleChange = (array) => {
    let productList = array;
    let category = array[0].product_category;
    let finalArray = category
    this.setState({ products: productList, category: finalArray});
  }

//(/api/bestSeller)
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          viewProduct: this.viewProduct
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
              style={{backgroundColor: '#f0f8ff'}}
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 " onClick={() => window.location.href="/home"}>RECOMs as a Service</b>

                <a
                  href="/"
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >

              <Link to="/home" className="navbar-item">
                Home
              </Link>

                <div class="navbar-item has-dropdown is-hoverable" >
                <a class="navbar-link">
                  Products
                </a>

                <div class="navbar-dropdown is-link">
                    {DropDownPerGender(this.handleChange)}
                    {/* <hr class="dropdown-divider"></hr>
                    {DropDownPerGender(this.handleChange)}
                    <hr class="dropdown-divider"></hr>
                    {DropDownPerGender(this.handleChange)} */}
                </div>
              </div>

                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-link"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                <div class="navbar-end">
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <a href="/" className="navbar-item" onClick={this.logout}>
                    Logout
                  </a>
                )}
                </div>
              </div>
            </nav>

            <Switch>
              <Route exact path="/" component={ForYou} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/home" component={ForYou}/>
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
